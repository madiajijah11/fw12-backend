const { Pool, Client } = require('pg')

require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const poolString = new Pool({
  connectionString: process.env.DB_URL
})

poolString.trClient = () =>
  new Client({
    connectionString: process.env.DB_URL
  })

module.exports = { pool, poolString }
