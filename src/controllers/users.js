const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/users");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");

exports.getUsers = (req, res) => {
  const sortables = ["name", "createdAt", "updatedAt"];
  getUsers((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.getUser = (req, res) => {
  getUser(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createUser = (req, res) => {
  createUser(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateUser = (req, res) => {
  updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteUser = (req, res) => {
  deleteUser(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
