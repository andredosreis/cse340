/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************

 * Require Statements
 *************************/

require("dotenv").config({ path: "./.env.sample" });  // Carrega as variáveis de ambiente
console.log("PORT:", process.env.PORT);
console.log("HOST:", process.env.HOST);

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const baseController = require('./controllers/baseController');
const pool = require("./database/");
const utilities = require("./utilities");

const app = express();



/* ***********************
 * View Engine and template
 *************************/
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // Layout do EJS
app.use(express.static("public"));


/* ***********************
 * Routes
 *************************/
app.use(require('./routes/static'));

// Rota principal
app.get("/", baseController.buildHome);

//ROUTE FOR INVENTORY
app.get("/inventory/:classification_id", baseController.showInventory);

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'});
});

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

// File Not Found Route - must be last route in list

/* *********************** 
 * Local Server Information
 * Values from .env (environment) file
 *************************/

// Aqui usamos a variável de ambiente `PORT` do Render (ou 10000 se não estiver configurada)
const port = process.env.PORT || 10000;
const host =  '0.0.0.0';  // No Render, o host geralmente deve ser 0.0.0.0

// Inicializa o servidor
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
