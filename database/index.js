const { Pool } = require("pg")
require("dotenv").config()

let pool

// Função de consulta comum para ambos os ambientes
const queryFunction = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
}

// Configuração do pool com SSL para ambos os ambientes
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

if (process.env.NODE_ENV === "development") {
  pool = new Pool(poolConfig)
  module.exports = queryFunction
} else {
  // Ambiente de produção (Render)
  pool = new Pool(poolConfig)
  module.exports = queryFunction
}