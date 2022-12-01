const {
  getMovieCast,
  createMovieCast,
  updateMovieCast,
  deleteMovieCast,
} = require("../models/movieCast");
const { errorHandling } = require("../helpers/errorHandler");

exports.getMovieCast = (req, res) => {
  getMovieCast((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Cast retrieved successfully",
      data: result.rows,
    });
  });
};

exports.createMovieCast = (req, res) => {
  createMovieCast(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Cast created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateMovieCast = (req, res) => {
  updateMovieCast(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Cast updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteMovieCast = (req, res) => {
  deleteMovieCast(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Movie Cast deleted successfully",
      data: result.rows[0],
    });
  });
};
