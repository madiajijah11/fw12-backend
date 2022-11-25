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
  createMovieCast(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovieCast = (req, res) => {
  updateMovieCast(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovieCast = (req, res) => {
  deleteMovieCast(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
