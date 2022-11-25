const { poolString } = require("../helpers");

exports.getMovieGenre = (cb) => {
  const sql = 'SELECT * FROM "movieGenre"';
  return poolString.query(sql, cb);
};

exports.createMovieGenre = (data, cb) => {
  const sql =
    'INSERT INTO "movieGenre" ("movieId", "genreId") VALUES ($1,$2) RETURNING *';
  const values = [data.movieId, data.genreId];
  return poolString.query(sql, values, cb);
};

exports.updateMovieGenre = (id, data, cb) => {
  const sql = `UPDATE "movieGenre" SET "movieId" = COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "genreId" = COALESCE(NULLIF($2, '')::INTEGER, "genreId") WHERE id = $3 RETURNING *`;
  const values = [data.movieId, data.genreId, id];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieGenre = (id, cb) => {
  const sql = 'DELETE FROM "movieGenre" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
