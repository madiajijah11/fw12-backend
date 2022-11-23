const connect = require("../helpers/index");

exports.getUsers = (req, res) => {
  connect.query("SELECT * FROM users", (err, result) => {
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
  connect.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
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
  connect.query(
    `INSERT INTO users ("picture", "firstName", "lastName", "phoneNumber", "email", "password", "roleId") VALUES ('${picture}', '${firstName}', '${lastName}', '${phoneNumber}',  '${email}', '${password}', '${roleId}')`,
    (err, _result) => {
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
    }
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { picture, firstName, lastName, phoneNumber, email, password, roleId } =
    req.body;
  connect.query(
    `UPDATE users SET "picture" = '${picture}', "firstName" = '${firstName}', "lastName" = '${lastName}', "phoneNumber" = '${phoneNumber}', "email" = '${email}', "password" = '${password}', "roleId" = '${roleId}' WHERE "id" = ${id}`,
    (err, _result) => {
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
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  connect.query(`DELETE FROM users WHERE id = ${id}`, (err, _result) => {
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
