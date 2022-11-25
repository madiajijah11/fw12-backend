const {
  getPaymentMethods,
  createPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
} = require("../models/paymentMethods");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getPaymentMethods = (req, res) => {
  getPaymentMethods((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createPaymentMethods = (req, res) => {
  createPaymentMethods(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updatePaymentMethods = (req, res) => {
  updatePaymentMethods(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deletePaymentMethods = (req, res) => {
  deletePaymentMethods(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
