const pool = require("../database/")


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications}


/* ***************************
 *  Get inventory by classification ID
 *************************** */
async function getInventoryByClassification(classification_id) {
  const sql = "SELECT * FROM public.inventory WHERE classification_id = $1";
  const result = await pool.query(sql, [classification_id]);
  console.log("reultado da consulta:", result.rows);
  return result.rows;
}

/* Exportando funções corretamente */
module.exports = { getClassifications, getInventoryByClassification };
