const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const poolString = new Pool({
  connectionString: "postgres://postgres:1@localhost:5432/mexl_cinema",
});

module.exports = { pool, poolString };
