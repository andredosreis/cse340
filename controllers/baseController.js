const utilities = require("../utilities")
const baseController = {}

baseController.buildHome = async function(req, res){
  try {
    const nav = await utilities.getNav()
    res.render("index", {title: "Home", nav}) 
  } catch (error) {
    console.error(error);
    res.render("index", {title: "Home"});
  }  
}

module.exports = baseController

const { buildClassificationGrid } = require('../utilities');
const VehicleModel = require('../models/vehicleModel');

async function renderClassificationView(req, res) {
  const classification = req.params.classification;
  try {
    const data = await VehicleModel.getVehiclesByClassification(classification);
    const grid = buildClassificationGrid(data); // Gera o HTML da grid
    const title = `${classification} Vehicles`;
    res.render('inventory/classification', { title, grid });
  } catch (error) {
    console.error('Error rendering classification view:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { renderClassificationView };
