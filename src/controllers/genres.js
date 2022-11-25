const {
  getGenres,
  pageInfo,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../models/genres");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");

exports.getGenres = (req, res) => {
  const sortables = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getGenres(filter, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      return emptyRows(res, result, pageInfo);
    });
  });
};

exports.createGenre = (req, res) => {
  createGenre(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateGenre = (req, res) => {
  updateGenre(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteGenre = (req, res) => {
  deleteGenre(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
