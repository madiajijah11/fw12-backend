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
  createMovieScheduleTimes(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovieScheduleTimes = (req, res) => {
  updateMovieScheduleTimes(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovieScheduleTimes = (req, res) => {
  deleteMovieScheduleTimes(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
