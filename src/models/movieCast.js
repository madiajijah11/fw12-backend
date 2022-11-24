const { poolString } = require("../helpers");

exports.getMovieCast = (cb) => {
  const sql = 'SELECT * FROM "movieCast"';
  return poolString.query(sql, cb);
};

exports.createMovieCast = (data, cb) => {
  const sql =
    'INSERT INTO "movieCast" ("movieId", "castId") VALUES ($1,$2) RETURNING *';
  const { movieId, castId } = data.body;
  const values = [movieId, castId];
  return poolString.query(sql, values, cb);
};

exports.updateMovieCast = (data, cb) => {
  const sql =
    'UPDATE "movieCast" SET "movieId" = $1, "castId" = $2, "updatedAt" = $3 WHERE id = $4 RETURNING *';
  const { id } = data.params;
  const { movieId, castId } = data.body;
  const values = [movieId, castId, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieCast = (data, cb) => {
  const sql = 'DELETE FROM "movieCast" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
