const {
  getMovies,
  getMovie,
  pageInfo,
  createMovie,
  updateMovie,
  deleteMovie,
  pageInfoUpcoming,
  upcomingMovies,
  nowShowingMovies,
} = require("../models/movies");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");

exports.getMovies = (req, res) => {
  const sortables = ["title", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getMovies(filter, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      return emptyRows(res, result, pageInfo);
    });
  });
};

exports.getMovie = (req, res) => {
  getMovie(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createMovie = (req, res) => {
  createMovie(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateMovie = (req, res) => {
  updateMovie(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.upcomingMovies = (req, res) => {
  const monthNow = new Date().toLocaleString("default", { month: "long" });
  const yearNow = new Date().getFullYear().toString();
  const dateYear = {
    month: req.query.month ? req.query.month : monthNow,
    year: req.query.year ? req.query.year : yearNow,
  };
  upcomingMovies(dateYear, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.nowShowingMovies = (req, res) => {
  nowShowingMovies((err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
