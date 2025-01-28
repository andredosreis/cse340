/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************

 * Require Statements
 *************************/

require("dotenv").config({ path: "./.env.sample" });
console.log("PORT:", process.env.PORT);
console.log("HOST:", process.env.HOST);

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require('./controllers/baseController');
const pool = require("./database/")
const utilities = require("./utilities")


const app = express()
/* ***********************
 * View Engine and template
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout")//not at  views layout


/* ***********************
 * Routes
 *************************/
app.use(require('./routes/static'));

// index route
app.get("/", baseController.buildHome);



// invintory route -unit 3, acrivity

//app.use("/inv", require('./routes/inventory-route'));

/* *********************** 
 * Local Server Information
 * Values from .env (environment) file
 *************************/

const port = process.env.PORT || 10000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});




