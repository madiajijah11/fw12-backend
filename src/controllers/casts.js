const {
  getCasts,
  pageInfo,
  createCast,
  updateCast,
  deleteCast,
} = require("../models/casts");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");

exports.getCasts = (req, res) => {
  const sortables = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getCasts(filter, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      return emptyRows(res, result, pageInfo);
    });
  });
};

exports.createCast = (req, res) => {
  createCast(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateCast = (req, res) => {
  updateCast(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteCast = (req, res) => {
  deleteCast(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
