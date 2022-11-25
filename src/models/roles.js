const { poolString } = require("../helpers");

exports.getRoles = (cb) => {
  const sql = "SELECT * FROM roles";
  return poolString.query(sql, cb);
};

exports.createRole = (data, cb) => {
  const sql = 'INSERT INTO roles ("name") VALUES ($1) RETURNING *';
  const values = [data.name];
  return poolString.query(sql, values, cb);
};

exports.updateRole = (id, data, cb) => {
  const sql = `UPDATE roles SET "name" = COALESCE($1, "name") WHERE id = $2 RETURNING *`;
  const values = [data.name, id];
  return poolString.query(sql, values, cb);
};

exports.deleteRole = (data, cb) => {
  const sql = "DELETE FROM roles WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
