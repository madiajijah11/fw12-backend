const { poolString } = require("../helpers/db");

exports.pageInfo = (filter, cb) => {
  const sql = `SELECT COUNT("fullName") AS "totalData" FROM "transactions" WHERE "fullName" LIKE $1`;
  const values = [`%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getTransactions = (filter, cb) => {
  const sql = `SELECT * FROM "transactions" WHERE "fullName" LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  return poolString.query(sql, values, cb);
};

exports.getTransaction = (id, cb) => {
  const sql = 'SELECT * FROM "transactions" WHERE id = $1';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createTransactions = (data, cb) => {
  const sql =
    'INSERT INTO "transactions" ("userId", "bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId", "paymentMethodId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *';
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
    data.paymentMethodId,
  ];
  return poolString.query(sql, values, cb);
};

exports.updateTransactions = (id, data, cb) => {
  const sql = `UPDATE "transactions" SET "bookingDate" = COALESCE(NULLIF($1, '')::TIMESTAMPTZ, "bookingDate"), "movieId" = COALESCE(NULLIF($2, '')::INTEGER, "movieId"), "cinemaId" = COALESCE(NULLIF($3, '')::INTEGER, "cinemaId"), "movieScheduleId" = COALESCE(NULLIF($4, '')::INTEGER, "movieScheduleId"), "fullName" = COALESCE(NULLIF($5, ''), "fullName"), "email" = COALESCE(NULLIF($6, ''), "email"), "phoneNumber" = COALESCE(NULLIF($7, ''), "phoneNumber"), "statusId" = COALESCE(NULLIF($8, '')::INTEGER, "statusId") WHERE id = $9 RETURNING *`;
  const values = [
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.movieScheduleId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.statusId,
    id,
  ];
  return poolString.query(sql, values, cb);
};

exports.deleteTransactions = (id, cb) => {
  const sql = 'DELETE FROM "transactions" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.checkout = async (data, cb) => {
  try {
    await poolString.query("BEGIN");

    const insertTransaction =
      'INSERT INTO "transactions" ("userId", "bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId", "paymentMethodId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING "bookingDate", "fullName", "email", "phoneNumber"';
    const sqlTransaction = await poolString.query(insertTransaction, [
      data.userId,
      data.bookingDate,
      data.movieId,
      data.cinemaId,
      data.movieScheduleId,
      data.fullName,
      data.email,
      data.phoneNumber,
      data.statusId,
      data.paymentMethodId,
    ]);

    const insertSeatNum =
      'INSERT INTO "reserveSeats" ("seatNum", "transactionId") VALUES ($1,$2) RETURNING "seatNum"';
    const insertSeatNumValues = [data.seatNum, sqlTransaction.rows[0].id];
    const sqlSeat = await poolString.query(insertSeatNum, insertSeatNumValues);

    await poolString.query("COMMIT");

    const result = {
      transaction: sqlTransaction.rows[0],
      seat: sqlSeat.rows[0],
    };
    cb(null, result);
  } catch (err) {
    await poolString.query("ROLLBACK");
    cb(err, null);
  }
};
