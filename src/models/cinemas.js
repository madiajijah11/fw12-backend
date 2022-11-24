const { poolString } = require("../helpers");

exports.getCinemas = (cb) => {
  const sql = 'SELECT * FROM "cinemas"';
  return poolString.query(sql, cb);
};

exports.getCinemas = (data, cb) => {
  const { id } = data.params;
  const sql = 'SELECT * FROM "cinemas" WHERE id = $1';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createCinemas = (data, cb) => {
  const sql =
    'INSERT INTO "cinemas" ("picture", "name", "address", "city") VALUES ($1,$2,$3,$4) RETURNING *';
  const { picture, name, address, city } = data.body;
  const values = [picture, name, address, city];
  return poolString.query(sql, values, cb);
};

exports.updateCinemas = (data, cb) => {
  const sql =
    'UPDATE "cinemas" SET "picture" = $1, "name" = $2, "address" = $3, "city" = $4, "updatedAt" = $5 WHERE id = $6 RETURNING *';
  const { id } = data.params;
  const { picture, name, address, city } = data.body;
  const values = [picture, name, address, city, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteCinemas = (data, cb) => {
  const sql = 'DELETE FROM "cinemas" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
