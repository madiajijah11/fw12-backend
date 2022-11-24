const { poolString } = require("../helpers");

exports.getSubscribers = (cb) => {
  const sql = "SELECT * FROM subscribers";
  return poolString.query(sql, cb);
};

exports.createSubscribers = (data, cb) => {
  const sql = 'INSERT INTO subscribers ("email") VALUES ($1) RETURNING *';
  const { email } = data.body;
  const values = [email];
  return poolString.query(sql, values, cb);
};

exports.updateSubscribers = (data, cb) => {
  const sql =
    'UPDATE subscribers SET "email" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const { id } = data.params;
  const { email } = data.body;
  const values = [email, new Date(), id];
  return poolString.query(sql, values, cb);
};

exports.deleteSubscribers = (data, cb) => {
  const sql = "DELETE FROM subscribers WHERE id = $1 RETURNING *";
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
