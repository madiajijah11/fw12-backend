const {
  getCasts,
  createCast,
  updateCast,
  deleteCast,
} = require("../models/casts");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getCasts = (req, res) => {
  getCasts((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createCast = (req, res) => {
  createCast(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateCast = (req, res) => {
  updateCast(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteCast = (req, res) => {
  deleteCast(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
