const {
  getSubscribers,
  createSubscribers,
  updateSubscribers,
  deleteSubscribers,
} = require("../models/subscribers");
const { errorHandling } = require("../helpers/errorHandler");

exports.getSubscribers = (req, res) => {
  getSubscribers((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Subscribers retrieved successfully",
      data: result.rows,
    });
  });
};

exports.createSubscribers = (req, res) => {
  createSubscribers(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Subscriber created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateSubscribers = (req, res) => {
  updateSubscribers(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Subscriber updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteSubscribers = (req, res) => {
  deleteSubscribers(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully",
      data: result.rows[0],
    });
  });
};
