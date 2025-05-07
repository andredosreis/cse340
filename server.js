/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
require("dotenv").config(); // Carrega as variáveis de ambiente
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const baseController = require('./controllers/baseController');
const utilities = require("./utilities");
const app = express();

/* ***********************
 * View Engine and Templates
 *************************/
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.static("public"));

/* ***********************
 * Routes
 *************************/
app.use(require('./routes/static'));

// Rota principal com tratamento de erro
app.get("/", utilities.handleErrors(baseController.buildHome));

// Rota para inventário com tratamento de erro
app.get("/inventory/:classification_id", utilities.handleErrors(baseController.showInventory));

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
// 404 Error
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

// Error Handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  
  // Define a mensagem de erro apropriada
  let message = err.status === 404 
    ? err.message 
    : 'Oh no! There was a crash. Maybe try a different route?';

  res.status(err.status || 500).render("errors/error", {
    title: err.status ? `${err.status} Error` : 'Server Error',
    message,
    nav
  });
});

/* *********************** 
 * Server Configuration
 *************************/
const port = process.env.PORT || 10000;
const host = '0.0.0.0';  // Configuração para o Render

// Inicializa o servidor
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});