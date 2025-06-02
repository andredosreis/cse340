const pool = require("../database/");

/* ***************************
 *  Get all classification data
 *************************** */
async function getClassifications() {
  // Retorna todas as classificações de veículos, ordenadas por nome
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 *  Get inventory by classification ID
 *************************** */
async function getInventoryByClassification(classification_id) {
  console.log("Buscando veículos para classification_id:", classification_id);
  const sql = "SELECT * FROM public.inventory WHERE classification_id = $1";
  const result = await pool.query(sql, [classification_id]);
  console.log("Resultado da consulta:", result.rows);
  return result.rows;
}

/* ***************************
 *  Get vehicle details by inventory ID
 *************************** */
async function getInventoryById(inv_id) {
  console.log("Buscando detalhes para inv_id:", inv_id);
  const sql = "SELECT * FROM public.inventory WHERE inv_id = $1";
  const result = await pool.query(sql, [inv_id]);
  console.log("Resultado da consulta:", result.rows[0]);
  return result.rows[0]; // retorna só um objeto (um veículo)
}

/* ***************************
 *  Exporta todas as funções
 *************************** */
module.exports = {
  getClassifications,
  getInventoryByClassification,
  getInventoryById
};
