const pool = require("../helpers");

exports.getUsers = (req, res) => {
  const selectQueryAll = "SELECT * FROM users";

  pool.query(selectQueryAll, (err, result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  });
};

exports.getUser = (req, res) => {
  const { id } = req.params;

  const selectQueryById = `SELECT * FROM users WHERE id = ${id}`;

  pool.query(selectQueryById, (err, result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  });
};

exports.createUser = (req, res) => {
  const { picture, firstName, lastName, phoneNumber, email, password, roleId } =
    req.body;

  const insertQuery = `INSERT INTO users ("picture", "firstName", "lastName", "phoneNumber", "email", "password", "roleId") VALUES ('${picture}', '${firstName}', '${lastName}', '${phoneNumber}',  '${email}', '${password}', '${roleId}')`;

  pool.query(insertQuery, (err, _result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;

  const { picture, firstName, lastName, phoneNumber, email, password, roleId } =
    req.body;

  const updateQuery = `UPDATE users SET "picture" = '${picture}', "firstName" = '${firstName}', "lastName" = '${lastName}', "phoneNumber" = '${phoneNumber}', "email" = '${email}', "password" = '${password}', "roleId" = '${roleId}' WHERE "id" = ${id}`;

  pool.query(updateQuery, (err, _result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM users WHERE id = ${id}`;

  pool.query(deleteQuery, (err, _result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });
};
