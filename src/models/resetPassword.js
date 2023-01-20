const { poolString } = require('../helpers/db')

exports.getResetPassword = (cb) => {
  const sql = 'SELECT * FROM "resetPassword"'
  return poolString.query(sql, cb)
}

exports.createResetPassword = (data, cb) => {
  const sql =
    'INSERT INTO "resetPassword" ("email", "userId", "code") VALUES ($1,$2,$3) RETURNING *'
  const values = [data.email, data.userId, data.code]
  return poolString.query(sql, values, cb)
}

exports.updateResetPassword = (id, data, cb) => {
  const sql =
    'UPDATE "resetPassword" SET "email" = COALESCE(NULLIF($1,\'\'), "email"), "userId" = COALESCE(NULLIF($2,\'\')::INTEGER, "userId"), "code" = COALESCE(NULLIF($3,\'\'), "code") WHERE id = $4 RETURNING *'
  const values = [data.email, data.userId, data.code, id]
  return poolString.query(sql, values, cb)
}

exports.deleteResetPassword = (id, cb) => {
  const sql = 'DELETE FROM "resetPassword" WHERE "userId" = $1 RETURNING *'
  const values = [id]
  return poolString.query(sql, values, cb)
}

exports.selectEmailAndCode = async (data, cb) => {
  try {
    const sql = 'SELECT * FROM "resetPassword" WHERE "email" = $1 AND "code" = $2'
    const values = [data.email, data.code]
    const result = await poolString.query(sql, values)
    cb(null, result.rows[0])
  } catch (error) {
    cb(error, null)
  }
}
