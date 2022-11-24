const { poolString } = require("../helpers");

exports.getPaymentMethods = (cb) => {
  const sql = 'SELECT * FROM "paymentMethods"';
  return poolString.query(sql, cb);
};

exports.createPaymentMethods = (data, cb) => {
  const sql =
    'INSERT INTO "paymentMethods" ("picture", "name") VALUES ($1,$2) RETURNING *';
  const { picture, name } = data.body;
  const values = [picture, name];
  return poolString.query(sql, values, cb);
};

exports.updatePaymentMethods = (data, cb) => {
  const sql =
    'UPDATE "paymentMethods" SET "picture" = $1, "name" = $2, "updatedAt" = $3 WHERE id = $4 RETURNING *';
  const { id } = data.params;
  const { picture, name } = data.body;
  const values = [picture, name, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deletePaymentMethods = (data, cb) => {
  const sql = 'DELETE FROM "paymentMethods" WHERE id = $1 RETURNING *';
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
