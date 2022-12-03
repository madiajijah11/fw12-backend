const {
  getMovies,
  getMovie,
  countAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  upComingMovies,
  countAllUpcomingMovies,
  nowShowingMovies,
  countAllNowShowingMovies,
} = require("../models/movies");
const { errorHandling } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");
const response = require("../helpers/response");
const { validationResult, body } = require("express-validator");

exports.getMovies = (req, res) => {
  const sortables = ["title", "createdAt", "updatedAt"];
  filter(req.query, sortables, countAllMovies, res, (filter, pageInfo) => {
    getMovies(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res);
      }
      return response(
        200,
        true,
        "Movies retrieved successfully",
        result.rows,
        pageInfo,
        res
      );
    });
  });
};

exports.getMovie = (req, res) => {
  getMovie(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return response(
      200,
      true,
      "Movie retrieved successfully",
      result.rows[0],
      null,
      res
    );
  });
};

exports.createMovie = (req, res) => {
  createMovie(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return response(
      200,
      true,
      "Movie created successfully",
      result.rows[0],
      null,
      res
    );
  });
};

exports.updateMovie = (req, res) => {
  updateMovie(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    if (result) {
      return response(404, false, "Data not found", [], null, res);
    }
    return response(
      200,
      true,
      "Movie updated successfully",
      result.rows[0],
      null,
      res
    );
  });
};

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    if (result) {
      return response(404, false, "Data not found", [], null, res);
    }
    return response(
      200,
      true,
      "Movie deleted successfully",
      result.rows[0],
      null,
      res
    );
  });
};

exports.upComingMovies = (req, res) => {
  const sortables = ["title", "releaseDate", "createdAt", "updatedAt"];
  filter(
    req.query,
    sortables,
    countAllUpcomingMovies,
    res,
    (filter, pageInfo) => {
      upComingMovies(filter, (err, result) => {
        if (err) {
          return errorHandling(err, res);
        }
        return response(
          200,
          true,
          "Upcoming movies retrieved successfully",
          result.rows,
          pageInfo,
          res
        );
      });
    }
  );
};

exports.nowShowingMovies = (req, res) => {
  const sortables = ["title", "startDate", "endDate", "createdAt", "updatedAt"];
  filter(
    req.query,
    sortables,
    countAllNowShowingMovies,
    res,
    (filter, pageInfo) => {
      nowShowingMovies(filter, (err, result) => {
        if (err) {
          return errorHandling(err, res);
        }
        return response(
          200,
          true,
          "Now showing movies retrieved successfully",
          result.rows,
          pageInfo,
          res
        );
      });
    }
  );
};
