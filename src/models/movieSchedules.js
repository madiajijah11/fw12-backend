const { poolString } = require("../helpers");

exports.getMovieSchedules = (cb) => {
  const sql = 'SELECT * FROM "movieSchedules"';
  return poolString.query(sql, cb);
};

exports.getMovieSchedule = (data, cb) => {
  const { id } = data.params;
  const sql = 'SELECT * FROM "movieSchedules" WHERE id = $1';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createMovieSchedules = (data, cb) => {
  const sql =
    'INSERT INTO "movieSchedules" ("movieId", "cinemaId", "price", "startDate", "endDate") VALUES ($1,$2,$3,$4,$5) RETURNING *';
  const { movieId, cinemaId, price, startDate, endDate } = data.body;
  const values = [movieId, cinemaId, price, startDate, endDate];
  return poolString.query(sql, values, cb);
};

exports.updateMovieSchedules = (data, cb) => {
  const sql =
    'UPDATE "movieSchedules" SET "movieId" = $1, "cinemaId" = $2, "price" = $3, "startDate" = $4, "endDate" = $5, "updatedAt" = $6 WHERE id = $7 RETURNING *';
  const { id } = data.params;
  const { movieId, cinemaId, price, startDate, endDate } = data.body;
  const values = [movieId, cinemaId, price, startDate, endDate, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieSchedules = (data, cb) => {
  const sql = 'DELETE FROM "movieSchedules" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
