const { poolString } = require("../helpers");

exports.getReserveSeats = (cb) => {
  const sql = 'SELECT * FROM "reserveSeats"';
  return poolString.query(sql, cb);
};

exports.createReserveSeats = (data, cb) => {
  const sql =
    'INSERT INTO "reserveSeats" ("seatNum", "transactionId") VALUES ($1,$2) RETURNING *';
  const { seatNum, transactionId } = data.body;
  const values = [seatNum, transactionId];
  return poolString.query(sql, values, cb);
};

exports.updateReserveSeats = (data, cb) => {
  const sql =
    'UPDATE "reserveSeats" SET "seatNum" = $1, "transactionId" = $2, "updatedAt" = $3 WHERE id = $4 RETURNING *';
  const { id } = data.params;
  const { seatNum, transactionId } = data.body;
  const values = [seatNum, transactionId, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteReserveSeats = (data, cb) => {
  const sql = 'DELETE FROM "reserveSeats" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
