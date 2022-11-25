const {
  getCinemas,
  getCinema,
  pageInfo,
  createCinemas,
  updateCinemas,
  deleteCinemas,
} = require("../models/cinemas");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");

exports.getCinemas = (req, res) => {
  const sortables = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getCinemas(filter, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      return emptyRows(res, result, pageInfo);
    });
  });
};

exports.getCinema = (req, res) => {
  getCinema(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createCinemas = (req, res) => {
  createCinemas(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateCinemas = (req, res) => {
  updateCinemas(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteCinemas = (req, res) => {
  deleteCinemas(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
