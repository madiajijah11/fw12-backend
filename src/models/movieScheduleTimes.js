const { poolString } = require("../helpers");

exports.getMovieScheduleTimes = (cb) => {
  const sql = 'SELECT * FROM "movieScheduleTimes"';
  return poolString.query(sql, cb);
};

exports.createMovieScheduleTimes = (data, cb) => {
  const sql =
    'INSERT INTO "movieScheduleTimes" ("time", "movieScheduleId") VALUES ($1,$2) RETURNING *';
  const { time, movieScheduleId } = data.body;
  const values = [time, movieScheduleId];
  return poolString.query(sql, values, cb);
};

exports.updateMovieScheduleTimes = (data, cb) => {
  const sql =
    'UPDATE "movieScheduleTimes" SET "time" = $1, "movieScheduleId" = $2, "updatedAt" = $3 WHERE id = $4 RETURNING *';
  const { id } = data.params;
  const { time, movieScheduleId } = data.body;
  const values = [time, movieScheduleId, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteMovieScheduleTimes = (data, cb) => {
  const sql = 'DELETE FROM "movieScheduleTimes" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
