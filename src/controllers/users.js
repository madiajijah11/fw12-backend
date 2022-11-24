const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/users");
const { errorHandlers, emptyRows } = require("../helpers/errorHandler");

exports.getUsers = (req, res) => {
  getUsers(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
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
  getUser(req.params, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    return emptyRows(res, result);
  });
};

exports.createUser = (req, res) => {
  createUser(req.body, (err, result) => {
    if (err) {
      return errorHandlers(err, res);
    }
    return res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  });
};

exports.updateUser = (req, res) => {
  updateUser(req, (err, result) => {
    if (err) {
      return errorHandlers(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteUser = (req, res) => {
  deleteUser(req.params, (err, result) => {
    if (err) {
      return errorHandlers(err, res);
    }
    return emptyRows(res, result);
  });
};
