const {
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} = require("../models/status");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getStatus = (req, res) => {
  getStatus((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createStatus = (req, res) => {
  createStatus(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateStatus = (req, res) => {
  updateStatus(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteStatus = (req, res) => {
  deleteStatus(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
