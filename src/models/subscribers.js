const { poolString } = require('../helpers/db')

exports.getSubscribers = (cb) => {
  const sql = 'SELECT * FROM subscribers'
  return poolString.query(sql, cb)
}

exports.createSubscribers = (data, cb) => {
  const sql = 'INSERT INTO subscribers ("email") VALUES ($1) RETURNING *'
  const values = [data.email]
  return poolString.query(sql, values, cb)
}

exports.updateSubscribers = (id, data, cb) => {
  const sql = 'UPDATE subscribers SET "email" = COALESCE($1, "email") WHERE id = $2 RETURNING *'
  const values = [data.email, id]
  return poolString.query(sql, values, cb)
}

exports.deleteSubscribers = (id, cb) => {
  const sql = 'DELETE FROM subscribers WHERE id = $1 RETURNING *'
  const values = [id]
  return poolString.query(sql, values, cb)
}
