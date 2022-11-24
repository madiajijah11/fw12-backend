const {
  getMovieScheduleTimes,
  createMovieScheduleTimes,
  updateMovieScheduleTimes,
  deleteMovieScheduleTimes,
} = require("../models/movieScheduleTimes");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getMovieScheduleTimes = (req, res) => {
  getMovieScheduleTimes((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createMovieScheduleTimes = (req, res) => {
  createMovieScheduleTimes(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovieScheduleTimes = (req, res) => {
  updateMovieScheduleTimes(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovieScheduleTimes = (req, res) => {
  deleteMovieScheduleTimes(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
