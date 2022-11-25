const { poolString } = require("../helpers");

exports.getReserveSeats = (cb) => {
  const sql = 'SELECT * FROM "reserveSeats"';
  return poolString.query(sql, cb);
};

exports.createReserveSeats = (data, cb) => {
  const sql =
    'INSERT INTO "reserveSeats" ("seatNum", "transactionId") VALUES ($1,$2) RETURNING *';
  const values = [data.seatNum, data.transactionId];
  return poolString.query(sql, values, cb);
};

exports.updateReserveSeats = (data, cb) => {
  const sql = `UPDATE "reserveSeats" SET "seatNum" = COALESCE(NULLIF($1,''), "seatNum"), "transactionId" = COALESCE(NULLIF($2, '')::INTEGER, "transactionId") WHERE id = $3 RETURNING *`;
  const values = [data.seatNum, data.transactionId, id];
  return poolString.query(sql, values, cb);
};

exports.deleteReserveSeats = (id, cb) => {
  const sql = 'DELETE FROM "reserveSeats" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
