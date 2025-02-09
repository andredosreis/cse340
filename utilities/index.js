const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  console.log("Data from getNav:", data);
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inventory/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* ************************/
/* buind classicafication Grid*/


Util.buildClassificationGrid = function(data) {
  let grid = '';
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach(vehicle => {
      grid += '<li>';
      grid += `<a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">`;
      grid += `<img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}"/>`;
      grid += '</a>';
      grid += '<div class="namePrice">';
      grid += `<h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>`;
      grid += `<span>Price: $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>`;
      grid += '</div>';
      grid += '</li>';
    });
    grid += '</ul>';
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles found.</p>';
  }
  return grid;
};

module.exports = Util;


/* ************************
 * Error handling middleware
 ************************** */
Util.handleErrors = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error("Erro capturado:", error);
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  };
};

/* ************************
 * Escape HTML characters
 ************************** */
Util.escapeHtml = function (unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

module.exports = Util;
