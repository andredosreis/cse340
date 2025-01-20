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
const app = express()
const static = require("./routes/static")


/* ***********************
 * View Engine and template
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout")//not at  views layout


/* ***********************
 * Routes
 *************************/
app.use(static)

// index route
app.get("/", (req, res) => {
  res.render("partials/index", { title: "Home" })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500;
const host = process.env.HOST || '0.0.0.0';




/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, host, () => {
  console.log(`App listening on ${host}:${port}`);
});
