const {
  getCinemas,
  getCinema,
  createCinemas,
  updateCinemas,
  deleteCinemas,
} = require("../models/cinemas");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");

exports.getCinemas = (req, res) => {
  getCinemas((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.getCinema = (req, res) => {
  getCinemas(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createCinemas = (req, res) => {
  createCinemas(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateCinemas = (req, res) => {
  updateCinemas(req, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteCinemas = (req, res) => {
  deleteCinemas(req.params, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
