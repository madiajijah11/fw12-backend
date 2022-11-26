const { poolString } = require("../helpers");

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
    'INSERT INTO "transactions" ("bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
  const values = [
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.movieScheduleId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.statusId,
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
