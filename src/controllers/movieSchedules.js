const {
  getMovieSchedules,
  getMovieSchedule,
  createMovieSchedules,
  updateMovieSchedules,
  deleteMovieSchedules,
} = require("../models/movieSchedules");
const { errorHandling } = require("../helpers/errorHandler");

exports.getMovieSchedules = (req, res) => {
  getMovieSchedules((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie schedules retrieved successfully",
      data: result.rows,
    });
  });
};

exports.getMovieSchedule = (req, res) => {
  getMovieSchedule(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie schedule retrieved successfully",
      data: result.rows[0],
    });
  });
};

exports.createMovieSchedules = (req, res) => {
  createMovieSchedules(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie schedule created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateMovieSchedules = (req, res) => {
  updateMovieSchedules(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie schedule updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteMovieSchedules = (req, res) => {
  deleteMovieSchedules(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie schedule deleted successfully",
      data: result.rows[0],
    });
  });
};
