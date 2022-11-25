const { poolString } = require("../helpers");

exports.pageInfo = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "genres" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getGenres = (filter, cb) => {
  const sql = `SELECT * FROM genres WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.createGenre = (data, cb) => {
  const sql = 'INSERT INTO genres ("name") VALUES ($1) RETURNING *';
  const values = [data.name];
  return poolString.query(sql, values, cb);
};

exports.updateGenre = (id, data, cb) => {
  const sql = `UPDATE genres SET "name" = COALESCE(NULLIF($1, ''), "name") WHERE id = $3 RETURNING *`;
  const values = [data.name, id];
  return poolString.query(sql, values, cb);
};

exports.deleteGenre = (id, cb) => {
  const sql = "DELETE FROM genres WHERE id = $1 RETURNING *";
  const values = [id];
  return poolString.query(sql, values, cb);
};
