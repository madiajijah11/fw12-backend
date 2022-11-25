const { poolString } = require("../helpers");

exports.getResetPassword = (cb) => {
  const sql = 'SELECT * FROM "resetPassword"';
  return poolString.query(sql, cb);
};

exports.createResetPassword = (data, cb) => {
  const sql =
    'INSERT INTO "resetPassword" ("email", "userId", "code") VALUES ($1,$2,$3) RETURNING *';
  const values = [data.email, data.userId, data.code];
  return poolString.query(sql, values, cb);
};

exports.updateResetPassword = (id, data, cb) => {
  const sql = `UPDATE "resetPassword" SET "email" = COALESCE(NULLIF($1,''), "email"), "userId" = COALESCE(NULLIF($2,'')::INTEGER, "userId"), "code" = COALESCE(NULLIF($3,''), "code") WHERE id = $4 RETURNING *`;
  const values = [data.email, data.userId, data.code, id];
  return poolString.query(sql, values, cb);
};

exports.deleteResetPassword = (id, cb) => {
  const sql = 'DELETE FROM "resetPassword" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
