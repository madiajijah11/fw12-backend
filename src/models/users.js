const { poolString } = require("../helpers");

exports.getUsers = (data, cb) => {
  const sql = `SELECT * FROM users`;
  return poolString.query(sql, cb);
};

exports.getUser = (data, cb) => {
  const sql = `SELECT * FROM users WHERE id = $1`;
  const values = [data.id];
  return poolString.query(sql, values, cb);
};

exports.createUser = async (data, cb) => {
  const sql = `INSERT INTO users ("picture", "firstName", "lastName", "phoneNumber", "email", "password", "roleId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [
    data.picture,
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.email,
    data.password,
    data.roleId,
  ];
  return poolString.query(sql, values, cb);
};

exports.updateUser = (data, cb) => {
  const sql = `UPDATE users SET "picture" = $1, "firstName" = $2, "lastName" = $3, "phoneNumber" = $4, "email" = $5, "password" = $6, "roleId" = $7 WHERE id = $8 RETURNING *`;
  const { id } = data.params;
  const { picture, firstName, lastName, phoneNumber, email, password, roleId } =
    data.body;
  const values = [
    picture,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    roleId,
    id,
  ];
  return poolString.query(sql, values, cb);
};

exports.deleteUser = (data, cb) => {
  const sql = `DELETE FROM users WHERE id = $1 RETURNING *`;
  const values = [data.id];
  return poolString.query(sql, values, cb);
};
