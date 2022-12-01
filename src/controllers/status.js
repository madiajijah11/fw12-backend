const {
  getStatus,
  createStatus,
  updateStatus,
  deleteStatus,
} = require("../models/status");
const { errorHandling } = require("../helpers/errorHandler");

exports.getStatus = (req, res) => {
  getStatus((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Status retrieved successfully",
      data: result.rows,
    });
  });
};

exports.createStatus = (req, res) => {
  createStatus(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Status created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateStatus = (req, res) => {
  updateStatus(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteStatus = (req, res) => {
  deleteStatus(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Status deleted successfully",
      data: result.rows[0],
    });
  });
};
