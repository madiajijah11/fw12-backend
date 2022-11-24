const { poolString } = require("../helpers");

exports.getResetPassword = (cb) => {
  const sql = 'SELECT * FROM "resetPassword"';
  return poolString.query(sql, cb);
};

exports.createResetPassword = (data, cb) => {
  const sql =
    'INSERT INTO "resetPassword" ("email", "userId", "code") VALUES ($1,$2,$3) RETURNING *';
  const { email, userId, code } = data.body;
  const values = [email, userId, code];
  return poolString.query(sql, values, cb);
};

exports.updateResetPassword = (data, cb) => {
  const sql =
    'UPDATE "resetPassword" SET "email" = $1, "userId" = $2, "code" = $3, "updatedAt" = $4 WHERE id = $5 RETURNING *';
  const { id } = data.params;
  const { email, userId, code } = data.body;
  const values = [email, userId, code, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteResetPassword = (data, cb) => {
  const sql = 'DELETE FROM "resetPassword" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
