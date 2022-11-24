const { poolString } = require("../helpers");

exports.getGenres = (cb) => {
  const sql = "SELECT * FROM genres";
  return poolString.query(sql, cb);
};

exports.createGenre = (data, cb) => {
  const sql = 'INSERT INTO genres ("name") VALUES ($1) RETURNING *';
  const { name } = data.body;
  const values = [name];
  return poolString.query(sql, values, cb);
};

exports.updateGenre = (data, cb) => {
  const sql =
    'UPDATE genres SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const { id } = data.params;
  const { name } = data.body;
  const values = [name, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteGenre = (data, cb) => {
  const sql = "DELETE FROM genres WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
