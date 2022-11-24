const {
  getMovieCast,
  createMovieCast,
  updateMovieCast,
  deleteMovieCast,
} = require("../models/movieCast");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getMovieCast = (req, res) => {
  getMovieCast((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createMovieCast = (req, res) => {
  createMovieCast(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovieCast = (req, res) => {
  updateMovieCast(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovieCast = (req, res) => {
  deleteMovieCast(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
