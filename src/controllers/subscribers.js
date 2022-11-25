const {
  getSubscribers,
  createSubscribers,
  updateSubscribers,
  deleteSubscribers,
} = require("../models/subscribers");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getSubscribers = (req, res) => {
  getSubscribers((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createSubscribers = (req, res) => {
  createSubscribers(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateSubscribers = (req, res) => {
  updateSubscribers(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteSubscribers = (req, res) => {
  deleteSubscribers(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
