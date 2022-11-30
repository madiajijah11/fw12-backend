const { poolString } = require("../helpers/db");

exports.getPaymentMethods = (cb) => {
  const sql = 'SELECT * FROM "paymentMethods"';
  return poolString.query(sql, cb);
};

exports.createPaymentMethods = (data, cb) => {
  const sql =
    'INSERT INTO "paymentMethods" ("picture", "name") VALUES ($1,$2) RETURNING *';
  const values = [data.picture, data.name];
  return poolString.query(sql, values, cb);
};

exports.updatePaymentMethods = (id, data, cb) => {
  const sql = `UPDATE "paymentMethods" SET "picture" = COALESCE(NULLIF($1,''), "picture"), "name" = COALESCE(NULLIF($2,''), "name") WHERE id = $3 RETURNING *`;
  const values = [data.picture, data.name, id];
  return poolString.query(sql, values, cb);
};

exports.deletePaymentMethods = (id, cb) => {
  const sql = 'DELETE FROM "paymentMethods" WHERE id = $1 RETURNING *';
  const values = [id];
  return poolString.query(sql, values, cb);
};
