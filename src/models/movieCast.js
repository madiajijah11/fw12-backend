const { poolString } = require("../helpers/db");

exports.getMovieCast = (cb) => {
  const sql = 'SELECT * FROM "movieCast"';
  return poolString.query(sql, cb);
};

exports.createMovieCast = (data, cb) => {
  const sql =
    'INSERT INTO "movieCast" ("movieId", "castId") VALUES ($1,$2) RETURNING *';
  const values = [data.movieId, data.castId];
  return poolString.query(sql, values, cb);
};

exports.updateMovieCast = (id, data, cb) => {
  const sql = `UPDATE "movieCast" SET "movieId" = COALESCE(NULLIF($1,'')::INTEGER, "movieId")::INTEGER "castId" = COALESCE(NULLIF($2, '')::INTEGER, "castId")::INTEGER WHERE id = $3 RETURNING *`;
  const values = [data.movieId, data.castId, id];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieCast = (id, cb) => {
  const sql = 'DELETE FROM "movieCast" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
