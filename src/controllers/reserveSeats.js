const {
  getReserveSeats,
  createReserveSeats,
  updateReserveSeats,
  deleteReserveSeats,
} = require("../models/reserveSeats");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getReserveSeats = (req, res) => {
  getReserveSeats((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createReserveSeats = (req, res) => {
  createReserveSeats(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateReserveSeats = (req, res) => {
  updateReserveSeats(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteReserveSeats = (req, res) => {
  deleteReserveSeats(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
