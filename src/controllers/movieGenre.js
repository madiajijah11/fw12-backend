const {
  getMovieGenre,
  createMovieGenre,
  updateMovieGenre,
  deleteMovieGenre,
} = require("../models/movieGenre");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getMovieGenre = (req, res) => {
  getMovieGenre((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createMovieGenre = (req, res) => {
  createMovieGenre(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovieGenre = (req, res) => {
  updateMovieGenre(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovieGenre = (req, res) => {
  deleteMovieGenre(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
