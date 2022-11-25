const { poolString } = require("../helpers");

exports.getStatus = (cb) => {
  const sql = "SELECT * FROM status";
  return poolString.query(sql, cb);
};

exports.createStatus = (data, cb) => {
  const sql = 'INSERT INTO status ("name") VALUES ($1) RETURNING *';
  const values = [data.name];
  return poolString.query(sql, values, cb);
};

exports.updateStatus = (data, cb) => {
  const sql = `UPDATE status SET "name" = COALESCE($1, "name") WHERE id = $2 RETURNING *`;
  const values = [data.name, id];
  return poolString.query(sql, values, cb);
};

exports.deleteStatus = (id, cb) => {
  const sql = "DELETE FROM status WHERE id = $1 RETURNING *";
  const values = [id];
  return poolString.query(sql, values, cb);
};
