const {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../models/genres");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getGenres = (req, res) => {
  getGenres((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createGenre = (req, res) => {
  createGenre(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateGenre = (req, res) => {
  updateGenre(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteGenre = (req, res) => {
  deleteGenre(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
