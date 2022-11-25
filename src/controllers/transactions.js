const {
  getTransactions,
  getTransaction,
  createTransactions,
  updateTransactions,
  deleteTransactions,
} = require("../models/transactions");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getTransactions = (req, res) => {
  getTransactions((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.getTransaction = (req, res) => {
  getTransaction(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createTransactions = (req, res) => {
  createTransactions(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateTransactions = (req, res) => {
  updateTransactions(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteTransactions = (req, res) => {
  deleteTransactions(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
