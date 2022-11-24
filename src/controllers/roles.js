const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../models/roles");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getRoles = (req, res) => {
  getRoles((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createRole = (req, res) => {
  createRole(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateRole = (req, res) => {
  updateRole(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteRole = (req, res) => {
  deleteRole(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
