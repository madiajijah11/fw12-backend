const {
  getMovieSchedules,
  getMovieSchedule,
  createMovieSchedules,
  updateMovieSchedules,
  deleteMovieSchedules,
} = require("../models/movieSchedules");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getMovieSchedules = (req, res) => {
  getMovieSchedules((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.getMovieSchedule = (req, res) => {
  getMovieSchedule(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createMovieSchedules = (req, res) => {
  createMovieSchedules(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovieSchedules = (req, res) => {
  updateMovieSchedules(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovieSchedules = (req, res) => {
  deleteMovieSchedules(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
