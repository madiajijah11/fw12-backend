const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mexl_cinema",
  password: "1",
  port: 5432,
});

const poolString = new Pool({
  connectionString: "postgres://postgres:1@localhost:5432/mexl_cinema",
});

module.exports = { pool, poolString };
