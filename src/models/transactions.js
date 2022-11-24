const { poolString } = require("../helpers");

exports.getTransactions = (cb) => {
  const sql = 'SELECT * FROM "transactions"';
  return poolString.query(sql, cb);
};

exports.getTransaction = (data, cb) => {
  const { id } = data.params;
  const sql = 'SELECT * FROM "transactions" WHERE id = $1';
  const values = [id];
  return poolString.query(sql, values, cb);
};

exports.createTransactions = (data, cb) => {
  const sql =
    'INSERT INTO "transactions" ("bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
  const {
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    statusId,
  } = data.body;
  const values = [
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    statusId,
  ];
  return poolString.query(sql, values, cb);
};

exports.updateTransactions = (data, cb) => {
  const sql =
    'UPDATE "transactions" SET "bookingDate" = $1, "movieId" = $2, "cinemaId" = $3, "movieScheduleId" = $4, "fullName" = $5, "email" = $6, "phoneNumber" = $7, "statusId" = $8, "updatedAt" = $9 WHERE id = $10 RETURNING *';
  const { id } = data.params;
  const {
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    statusId,
  } = data.body;
  const values = [
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    statusId,
    new Date(),
    id,
  ];
  return poolString.query(sql, values, cb);
};

exports.deleteTransactions = (data, cb) => {
  const sql = 'DELETE FROM "transactions" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
