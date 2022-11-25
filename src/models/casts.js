const { poolString } = require("../helpers");

exports.pageInfo = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "casts" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getCasts = (filter, cb) => {
  const sql = `SELECT * FROM "casts" WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.createCast = (data, cb) => {
  const sql = 'INSERT INTO casts ("name") VALUES ($1) RETURNING *';
  const values = [data.name];
  return poolString.query(sql, values, cb);
};

exports.updateCast = (id, data, cb) => {
  const sql =
    'UPDATE casts SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const values = [data.name, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteCast = (id, cb) => {
  const sql = "DELETE FROM casts WHERE id = $1 RETURNING *";
  const values = [id];
  return poolString.query(sql, values, cb);
};
