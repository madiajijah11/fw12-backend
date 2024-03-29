const { poolString } = require('../helpers/db')

exports.getMovieScheduleTimes = (cb) => {
  const sql = 'SELECT * FROM "movieScheduleTimes"'
  return poolString.query(sql, cb)
}

exports.createMovieScheduleTimes = (data, cb) => {
  const sql =
    'INSERT INTO "movieScheduleTimes" ("time", "movieScheduleId") VALUES ($1,$2) RETURNING *'
  const values = [data.time, data.movieScheduleId]
  return poolString.query(sql, values, cb)
}

exports.updateMovieScheduleTimes = (id, data, cb) => {
  const sql =
    'UPDATE "movieScheduleTimes" SET "time" = COALESCE(NULLIF($1,\'\')::TIME, "time"), "movieScheduleId" = COALESCE(NULLIF($2,\'\')::INTEGER, "movieScheduleId") WHERE id = $3 RETURNING *'
  const values = [data.time, data.movieScheduleId, id]
  return poolString.query(sql, values, cb)
}

exports.deleteMovieScheduleTimes = (id, cb) => {
  const sql = 'DELETE FROM "movieScheduleTimes" WHERE id = $1 RETURNING *'
  const values = [id]
  return poolString.query(sql, values, cb)
}
