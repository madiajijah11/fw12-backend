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

exports.getMovies = (req, res) => {
  const sortables = ["title", "createdAt", "updatedAt"];
  filter(req.query, sortables, countAllMovies, res, (filter, pageInfo) => {
    getMovies(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res);
      }
      return res.status(200).json({
        success: true,
        message: "Movies retrieved successfully",
        pageInfo,
        data: result.rows,
      });
    });
  });
};

exports.getMovie = (req, res) => {
  getMovie(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie retrieved successfully",
      data: result.rows[0],
    });
  });
};

exports.createMovie = (req, res) => {
  createMovie(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateMovie = (req, res) => {
  updateMovie(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: result.rows[0],
    });
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
        return res.status(200).json({
          success: true,
          message: "Upcoming movies retrieved successfully",
          pageInfo,
          data: result.rows,
        });
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
        return res.status(200).json({
          success: true,
          message: "Now showing movies retrieved successfully",
          pageInfo,
          data: result.rows,
        });
      });
    }
  );
};
