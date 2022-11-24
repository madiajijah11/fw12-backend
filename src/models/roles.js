const { poolString } = require("../helpers");

exports.getRoles = (cb) => {
  const sql = "SELECT * FROM roles";
  return poolString.query(sql, cb);
};

exports.createRole = (data, cb) => {
  const sql = 'INSERT INTO roles ("name") VALUES ($1) RETURNING *';
  const { name } = data.body;
  const values = [name];
  return poolString.query(sql, values, cb);
};

exports.updateRole = (data, cb) => {
  const sql =
    'UPDATE roles SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const { id } = data.params;
  const { name } = data.body;
  const values = [name, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteRole = (data, cb) => {
  const sql = "DELETE FROM roles WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
