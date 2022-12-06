const {
  getUsers,
  getUser,
  pageInfo,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/users");
const { errorHandling } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");
const fs = require("fs");
const fx = require("fs-extra");

exports.getUsers = (req, res) => {
  const sortables = ["firstName", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getUsers(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res);
      }
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        pageInfo,
        data: result.rows,
      });
    });
  });
};

exports.getUser = (req, res) => {
  getUser(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  });
};

exports.createUser = (req, res) => {
  console.log(req.body);
  createUser(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  });
};

exports.updateUser = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename;
    getUser(req.params.id, (err, result) => {
      if (err) {
        return errorHandling(err, res);
      }
      const [user] = result.rows;
      if (result.rows.length) {
        fx.ensureFile(`./uploads/${user.picture}`, (err) => {
          if (err) {
            return errorHandling(err, res);
          }
          fs.rm(`./uploads/${user.picture}`, (err) => {
            if (err) {
              return errorHandling(err, res);
            }
          });
        });
      } else {
        return errorHandling(err, res);
      }
    });
  }
  updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  });
};

exports.deleteUser = (req, res) => {
  deleteUser(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  });
};
