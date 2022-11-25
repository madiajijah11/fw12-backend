const { poolString } = require("../helpers");

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
  const sql = `UPDATE "movieSchedules" SET "movieId" = COALESCE($1, "movieId")::INTEGER, "cinemaId" = COALESCE($2, "cinemaId")::INTEGER, "price" = COALESCE($3, "price")::INTEGER, "startDate" = COALESCE($4, "startDate")::DATE, "endDate" = COALESCE($5, "endDate")::DATE WHERE id = $6 RETURNING *`;
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
