const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/users");

exports.getUsers = (req, res) => {
  getUsers(req, res);
};

exports.getUser = (req, res) => {
  getUser(req, res);
};

exports.createUser = (req, res) => {
  createUser(req, res);
};

exports.updateUser = (req, res) => {
  updateUser(req, res);
};

exports.deleteUser = (req, res) => {
  deleteUser(req, res);
};
