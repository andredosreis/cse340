const utilities = require("../utilities");
const inventoryModel = require("../models/inventory-model");

const baseController = {};

baseController.buildHome = async function(req, res) {
  try {
 const nav = await utilities.getNav();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error(error);
    res.render("index", { title: "Home" });
  }
};

baseController.showInventory = async function(req, res) {
  try {
    const classification_id = req.params.classification_id;
    console.log("Recebido classification_id:", classification_id);

    if (!classification_id) {
      throw new Error("classification_id está indefinido ou nulo");
    }

    const inventory = await inventoryModel.getInventoryByClassification(classification_id);
    const nav = await utilities.getNav(); // ✅ Certifica-se de que `nav` está disponível

    let grid;
    if (inventory.length > 0) {
      grid = inventory.map(vehicle => {
        console.log("Imagem Principal:", vehicle.inv_thumbnail,   "Thumbnail:", vehicle.inv_image,); // ✅ Debug
        return `
          <li>
            <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
            <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model} Thumbnail">
            <p>Preço: $${vehicle.inv_price}</p>
            <a href="${vehicle.inv_image}" target="_blank">Ver imagem maior</a>
          </li>
        `;
      }).join('');
      
    } else {
      grid = "<p>Nenhum veículo encontrado.</p>";
    }
     console.log("HTML gerado para grid:", grid);

    res.render("inventory/classification", {
      title: "Inventory",
      nav,  // ✅ Passando `nav` para a view
      grid
    });
  } catch (error) {
    console.error(error);
    res.render("inventory/classification", {
      title: "Inventory",
      nav: await utilities.getNav(), // ✅ Garantindo que `nav` sempre é passado
      grid: "<p>Erro ao buscar veículos.</p>"
    });
  }
};

baseController.showVehicle = async function(req, res) {
  try {
    const inv_id = req.params.inv_id;
    console.log("Recebido inv_id:", inv_id);
    const vehicle = await inventoryModel.getInventoryById(inv_id);
    
    if (vehicle) {
      // Se achou, mostra os detalhes
      res.render("vehicle-detail", { vehicle });
    } else {
      // Se não achou, mostra mensagem de erro amigável
      res.render("error", { message: "Veículo não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Erro ao buscar detalhes do veículo" });
  }
};



module.exports = baseController;
