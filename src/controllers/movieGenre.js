const {
  getMovieGenre,
  createMovieGenre,
  updateMovieGenre,
  deleteMovieGenre,
} = require("../models/movieGenre");
const { errorHandling } = require("../helpers/errorHandler");

exports.getMovieGenre = (req, res) => {
  getMovieGenre((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Genre retrieved successfully",
      data: result.rows[0],
    });
  });
};

exports.createMovieGenre = (req, res) => {
  createMovieGenre(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Genre created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateMovieGenre = (req, res) => {
  updateMovieGenre(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Genre updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteMovieGenre = (req, res) => {
  deleteMovieGenre(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Genre deleted successfully",
      data: result.rows[0],
    });
  });
};
