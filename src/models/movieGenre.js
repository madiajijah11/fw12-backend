const { poolString } = require("../helpers");

exports.getMovieGenre = (cb) => {
  const sql = 'SELECT * FROM "movieGenre"';
  return poolString.query(sql, cb);
};

exports.createMovieGenre = (data, cb) => {
  const sql =
    'INSERT INTO "movieGenre" ("movieId", "genreId") VALUES ($1,$2) RETURNING *';
  const { movieId, genreId } = data.body;
  const values = [movieId, genreId];
  return poolString.query(sql, values, cb);
};

exports.updateMovieGenre = (data, cb) => {
  const sql =
    'UPDATE "movieGenre" SET "movieId" = $1, "genreId" = $2, "updatedAt" = $3 WHERE id = $4 RETURNING *';
  const { id } = data.params;
  const { movieId, genreId } = data.body;
  const values = [movieId, genreId, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieGenre = (data, cb) => {
  const sql = 'DELETE FROM "movieGenre" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
