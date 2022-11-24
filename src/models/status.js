const { poolString } = require("../helpers");

exports.getStatus = (cb) => {
  const sql = "SELECT * FROM status";
  return poolString.query(sql, cb);
};

exports.createStatus = (data, cb) => {
  const sql = 'INSERT INTO status ("name") VALUES ($1) RETURNING *';
  const { name } = data.body;
  const values = [name];
  return poolString.query(sql, values, cb);
};

exports.updateStatus = (data, cb) => {
  const sql =
    'UPDATE status SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const { id } = data.params;
  const { name } = data.body;
  const values = [name, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteStatus = (data, cb) => {
  const sql = "DELETE FROM status WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
