const { poolString } = require('../helpers/db')

exports.pageInfo = (filter, cb) => {
  const sql = 'SELECT COUNT("firstName") AS "totalData" FROM "users" WHERE "firstName" LIKE $1'
  const values = [`%${filter.search}%`]
  return poolString.query(sql, values, cb)
}

exports.getUsers = (filter, cb) => {
  const sql = `SELECT * FROM users WHERE "firstName" LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  return poolString.query(sql, values, cb)
}

exports.getUser = (id, cb) => {
  const sql = 'SELECT * FROM users WHERE id = $1'
  const values = [id]
  return poolString.query(sql, values, cb)
}

exports.getUserByEmail = (email, cb) => {
  const sql = 'SELECT * FROM users WHERE email = $1'
  const values = [email]
  return poolString.query(sql, values, cb)
}

exports.createUser = (data, cb) => {
  const sql =
    'INSERT INTO users ("picture", "firstName", "lastName", "phoneNumber", "email", "password", "roleId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = [
    data.picture,
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.email,
    data.password,
    data.roleId
  ]
  return poolString.query(sql, values, cb)
}

exports.updateUser = async (id, data, cb) => {
  try {
    const sql =
      'UPDATE users SET "picture" = COALESCE(NULLIF($1, \'\'), "picture"), "firstName" = COALESCE(NULLIF($2, \'\'), "firstName"), "lastName" = COALESCE(NULLIF($3, \'\'), "lastName"), "phoneNumber" = COALESCE(NULLIF($4, \'\'), "phoneNumber"), "email" = COALESCE(NULLIF($5, \'\'), "email"), "password" = COALESCE(NULLIF($6, \'\'), "password"), "roleId" = COALESCE(NULLIF($7, \'\')::INTEGER, "roleId") WHERE id = $8 RETURNING *'
    const values = [
      data.picture,
      data.firstName,
      data.lastName,
      data.phoneNumber,
      data.email,
      data.password,
      data.roleId,
      id
    ]
    const result = await poolString.query(sql, values)
    cb(null, result.rows[0])
  } catch (error) {
    cb(error, null)
  }
}

exports.deleteUser = (id, cb) => {
  const sql = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const values = [id]
  return poolString.query(sql, values, cb)
}
