const {
  getResetPassword,
  createResetPassword,
  updateResetPassword,
  deleteResetPassword,
} = require("../models/resetPassword");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getResetPassword = (req, res) => {
  getResetPassword((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createResetPassword = (req, res) => {
  createResetPassword(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateResetPassword = (req, res) => {
  updateResetPassword(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteResetPassword = (req, res) => {
  deleteResetPassword(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
