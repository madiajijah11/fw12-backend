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
const responseHandler = require("../helpers/responseHandler");
const { body, validationResult } = require("express-validator");

exports.getMovies = (req, res) => {
  const sortables = ["title", "createdAt", "updatedAt"];
  filter(req.query, sortables, countAllMovies, res, (filter, pageInfo) => {
    getMovies(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res);
      }
      return responseHandler(
        200,
        true,
        "Movies retrieved successfully",
        pageInfo,
        result.rows,
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
    if (result.rows < 1) {
      return responseHandler(404, false, "Data not found", null, null, res);
    } else {
      return responseHandler(
        200,
        true,
        "Movie retrieved successfully",
        null,
        result.rows[0],
        res
      );
    }
  });
};

exports.createMovie = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseHandler(
      400,
      false,
      "All fields must be filled",
      null,
      errors.array(),
      res
    );
  }
  req.body.picture = req.file.filename;
  createMovie(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return responseHandler(
      201,
      true,
      "Movie created successfully",
      null,
      result.rows[0],
      res
    );
  });
};

exports.updateMovie = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseHandler(
      400,
      false,
      "All fields must be filled",
      null,
      errors.array(),
      res
    );
  }
  req.body.picture = req.file.filename;
  updateMovie(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    if (result.rows < 1) {
      return responseHandler(404, false, "Data not found", null, null, res);
    }
    return responseHandler(
      201,
      true,
      "Movie updated successfully",
      null,
      result.rows[0],
      res
    );
  });
};

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    if (result.rows < 1) {
      return responseHandler(404, false, "Data not found", null, null, res);
    }
    return responseHandler(
      200,
      true,
      "Movie deleted successfully",
      null,
      result.rows[0],
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
        return responseHandler(
          200,
          true,
          "Upcoming movies retrieved successfully",
          pageInfo,
          result.rows,
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
        return responseHandler(
          200,
          true,
          "Now showing movies retrieved successfully",
          pageInfo,
          result.rows,
          res
        );
      });
    }
  );
};
