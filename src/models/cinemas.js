const { poolString } = require("../helpers");

exports.pageInfo = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "cinemas" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getCinemas = (filter, cb) => {
  const sql = `SELECT * FROM "cinemas" WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getCinema = (id, cb) => {
  const sql = 'SELECT * FROM "cinemas" WHERE id = $1';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createCinemas = (data, cb) => {
  const sql =
    'INSERT INTO "cinemas" ("picture", "name", "address", "city") VALUES ($1,$2,$3,$4) RETURNING *';
  const values = [data.picture, data.name, data.address, data.city];
  return poolString.query(sql, values, cb);
};

exports.updateCinemas = (id, data, cb) => {
  const sql = `UPDATE "cinemas" SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "name" = COALESCE(NULLIF($2, ''), "name"), "address" = COALESCE(NULLIF($3, ''), "address"), "city" = COALESCE(NULLIF($4, ''), "city) WHERE id = $5 RETURNING *`;
  const values = [data.picture, data.name, data.address, data.city, id];
  return poolString.query(sql, values, cb);
};

exports.deleteCinemas = (id, cb) => {
  const sql = 'DELETE FROM "cinemas" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
