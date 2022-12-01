const {
  getTransactions,
  getTransaction,
  pageInfo,
  createTransactions,
  updateTransactions,
  deleteTransactions,
  checkout,
} = require("../models/transactions");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");
const jwt = require("jsonwebtoken");

exports.getTransactions = (req, res) => {
  const sortables = ["fullName", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getTransactions(filter, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      return emptyRows(res, result, pageInfo);
    });
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

exports.checkout = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = decoded;
  const transaction = {
    userId: id,
    bookingDate: req.body.bookingDate,
    movieId: req.body.movieId,
    cinemaId: req.body.cinemaId,
    movieScheduleId: req.body.movieScheduleId,
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    statusId: req.body.statusId,
    paymentMethodId: req.body.paymentMethodId,
    seatNum: req.body.seatNum,
  };
  checkout(transaction, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return res.status(200).json({
      status: "success",
      message: "Checkout success",
      data: result,
    });
  });
};
