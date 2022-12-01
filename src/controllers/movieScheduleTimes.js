const {
  getMovieScheduleTimes,
  createMovieScheduleTimes,
  updateMovieScheduleTimes,
  deleteMovieScheduleTimes,
} = require("../models/movieScheduleTimes");
const { errorHandling } = require("../helpers/errorHandler");

exports.getMovieScheduleTimes = (req, res) => {
  getMovieScheduleTimes((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Schedule Times retrieved successfully",
      data: result.rows,
    });
  });
};

exports.createMovieScheduleTimes = (req, res) => {
  createMovieScheduleTimes(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Schedule Times created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateMovieScheduleTimes = (req, res) => {
  updateMovieScheduleTimes(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Schedule Times updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteMovieScheduleTimes = (req, res) => {
  deleteMovieScheduleTimes(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Schedule Times deleted successfully",
      data: result.rows[0],
    });
  });
};
