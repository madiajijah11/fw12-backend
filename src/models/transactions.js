const { poolString } = require('../helpers/db')

exports.pageInfo = (filter, cb) => {
  const sql =
    'SELECT COUNT("fullName") AS "totalData" FROM "transactions" WHERE "fullName" LIKE $1'
  const values = [`%${filter.search}%`]
  return poolString.query(sql, values, cb)
}

exports.getTransactions = (filter, cb) => {
  const sql = `SELECT * FROM "transactions" WHERE "fullName" LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  return poolString.query(sql, values, cb)
}

exports.getTransaction = (id, cb) => {
  const sql = 'SELECT * FROM "transactions" WHERE id = $1'
  const values = [id]
  return poolString.query(sql, values, cb)
}

exports.createTransactions = (data, cb) => {
  const sql =
    'INSERT INTO "transactions" ("userId", "bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId", "paymentMethodId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *'
  const values = [
    data.userId,
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.movieScheduleId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.statusId,
    data.paymentMethodId
  ]
  return poolString.query(sql, values, cb)
}

exports.updateTransactions = (id, data, cb) => {
  const sql =
    'UPDATE "transactions" SET "bookingDate" = COALESCE(NULLIF($1, \'\')::TIMESTAMPTZ, "bookingDate"), "movieId" = COALESCE(NULLIF($2, \'\')::INTEGER, "movieId"), "cinemaId" = COALESCE(NULLIF($3, \'\')::INTEGER, "cinemaId"), "movieScheduleId" = COALESCE(NULLIF($4, \'\')::INTEGER, "movieScheduleId"), "fullName" = COALESCE(NULLIF($5, \'\'), "fullName"), "email" = COALESCE(NULLIF($6, \'\'), "email"), "phoneNumber" = COALESCE(NULLIF($7, \'\'), "phoneNumber"), "statusId" = COALESCE(NULLIF($8, \'\')::INTEGER, "statusId") WHERE id = $9 RETURNING *'
  const values = [
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.movieScheduleId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.statusId,
    id
  ]
  return poolString.query(sql, values, cb)
}

exports.deleteTransactions = (id, cb) => {
  const sql = 'DELETE FROM "transactions" WHERE id = $1 RETURNING *'
  const values = [id]
  return poolString.query(sql, values, cb)
}

exports.checkout = async (data, cb) => {
  console.log(data)
  const client = poolString.trClient()
  try {
    await client.connect()
    await client.query('BEGIN')

    console.log('ok')
    console.log(data.bookingDate, data.bookingTime, data.seatNum)
    const selectCheckSeat = `
    SELECT 1 FROM "reserveSeats" WHERE "bookingDate" = $1
    AND "bookingTime" = $2 AND "seatNum" = ANY (string_to_array($3, ','));`
    const selectSeatValues = [data.bookingDate, data.bookingTime, data.seatNum]
    const sqlCheckSeat = await client.query(selectCheckSeat, selectSeatValues)

    console.log(sqlCheckSeat)

    if (sqlCheckSeat.rows.length) {
      await client.query('ROLLBACK')
      return cb(null, {
        message: 'Seat is already reserved'
      })
    }

    console.log('ok1')

    const insertTransaction = `INSERT INTO "transactions"
      ("userId", "fullName", "email", "phoneNumber", "paymentMethodId")
      VALUES ($1,$2,$3,$4,$5) RETURNING *`
    const transactionValues = [
      data.userId,
      data.fullName,
      data.email,
      data.phoneNumber,
      data.paymentMethodId
    ]
    const sqlTransaction = await client.query(insertTransaction, transactionValues)
    console.log(sqlTransaction)

    if (!sqlTransaction.rows.length) {
      await client.query('ROLLBACK')
      return cb(null, {
        message: 'Failed to create transaction'
      })
    }

    const insertSeat =
      'INSERT INTO "reserveSeats" ("seatNum", "bookingDate", "bookingTime", "movieId", "cinemaId", "transactionId") VALUES ($1,$2,$3,$4,$5,$6)'
    const seats = data.seatNum.split(', ').forEach((seat) => {
      client.query(insertSeat, [
        seat,
        data.bookingDate,
        data.bookingTime,
        data.movieId,
        data.cinemaId,
        sqlTransaction.rows[0].id
      ])
    })

    await Promise.all(seats)
    await client.query('COMMIT')
    await client.end()
    cb(null, sqlTransaction.rows[0])
  } catch (err) {
    await client.query('ROLLBACK')
    await client.end()
    cb(err, null)
  }
}

exports.transactionHistory = async (id, cb) => {
  try {
    const sql = `
    SELECT t.id, m.title, rs."bookingDate", rs."bookingTime",
    c.name as "cinemaName", c.picture as "cinemaPicture"
    FROM transactions t
    JOIN "reserveSeats" rs ON rs."transactionId" = t.id
    JOIN movies m on rs."movieId" = m.id
    JOIN cinemas c on rs."cinemaId" = c.id
    WHERE t."userId" = $1
    GROUP BY t.id, m.title, rs."bookingDate", rs."bookingTime", c.name, c.picture`
    const values = [id]
    const result = await poolString.query(sql, values)
    console.log(result.rows)
    cb(null, result.rows)
  } catch (err) {
    cb(err, null)
  }
}

exports.ticketDetails = async (id, cb) => {
  try {
    const sql = `
    SELECT m.title, string_agg(g.name, ',') as genres,
    array_length(string_to_array(string_agg(DISTINCT rS."seatNum", ','), ','), 1) * (mS.price) as "totalPayment",
    string_to_array(string_agg(DISTINCT rS."seatNum", ','), ', ') as seats,
    rS."bookingTime", rS."bookingDate",
    c.name as "cinemaName", c.picture as "cinemaPicture"
    FROM transactions t
    JOIN "reserveSeats" rS on t.id = rS."transactionId"
    JOIN movies m on m.id = rS."movieId"
    JOIN "movieGenre" mG ON m.id = mG."movieId"
    JOIN genres g on mG."genreId" = g.id
    JOIN "movieSchedules" mS ON m.id = mS."movieId"
    JOIN cinemas c ON rS."cinemaId" = c.id
    WHERE t.id = $1
    GROUP BY m.title, rS."bookingTime", rS."bookingDate", c.name, c.picture, mS.price`
    const values = [id]
    const result = await poolString.query(sql, values)
    cb(null, result.rows)
  } catch (err) {
    cb(err, null)
  }
}
