const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../models/roles");
const { errorHandling } = require("../helpers/errorHandler");

exports.getRoles = (req, res) => {
  getRoles((err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Roles retrieved successfully",
      data: result.rows,
    });
  });
};

exports.createRole = (req, res) => {
  createRole(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Role created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateRole = (req, res) => {
  updateRole(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteRole = (req, res) => {
  deleteRole(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Role deleted successfully",
      data: result.rows[0],
    });
  });
};
