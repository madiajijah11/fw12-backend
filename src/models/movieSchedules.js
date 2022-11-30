const { poolString } = require("../helpers/db");

exports.getMovieSchedules = (cb) => {
  const sql = 'SELECT * FROM "movieSchedules"';
  return poolString.query(sql, cb);
};

exports.getMovieSchedule = (id, cb) => {
  const sql = 'SELECT * FROM "movieSchedules" WHERE id = $1';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createMovieSchedules = (data, cb) => {
  const sql =
    'INSERT INTO "movieSchedules" ("movieId", "cinemaId", "price", "startDate", "endDate") VALUES ($1,$2,$3,$4,$5) RETURNING *';
  const values = [
    data.movieId,
    data.cinemaId,
    data.price,
    data.startDate,
    data.endDate,
  ];
  return poolString.query(sql, values, cb);
};

exports.updateMovieSchedules = (id, data, cb) => {
  const sql = `UPDATE "movieSchedules" SET "movieId" = COALESCE(NULLIF($1,'')::INTEGER, "movieId"), "cinemaId" = COALESCE(NULLIF($2,'')::INTEGER, "cinemaId"), "price" = COALESCE(NULLIF($3,'')::INTEGER, "price"), "startDate" = COALESCE(NULLIF($4,'')::DATE, "startDate"), "endDate" = COALESCE(NULLIF($5,'')::DATE, "endDate") WHERE id = $6 RETURNING *`;
  const values = [
    data.movieId,
    data.cinemaId,
    data.price,
    data.startDate,
    data.endDate,
    id,
  ];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieSchedules = (id, cb) => {
  const sql = 'DELETE FROM "movieSchedules" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
