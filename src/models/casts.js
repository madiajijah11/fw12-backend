const { poolString } = require("../helpers");

exports.getCasts = (cb) => {
  const sql = "SELECT * FROM casts";
  return poolString.query(sql, cb);
};

exports.createCast = (data, cb) => {
  const sql = 'INSERT INTO casts ("name") VALUES ($1) RETURNING *';
  const { name } = data.body;
  const values = [name];
  return poolString.query(sql, values, cb);
};

exports.updateCast = (data, cb) => {
  const sql =
    'UPDATE casts SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const { id } = data.params;
  const { name } = data.body;
  const values = [name, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteCast = (data, cb) => {
  const sql = "DELETE FROM casts WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
