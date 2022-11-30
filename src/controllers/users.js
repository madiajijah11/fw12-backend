const {
  getUsers,
  getUser,
  pageInfo,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/users");
const { duplicateKey, emptyRows } = require("../helpers/errorHandler");
const filter = require("../helpers/filter");
const fs = require("fs");
const fx = require("fs-extra");

exports.getUsers = (req, res) => {
  const sortables = ["firstName", "createdAt", "updatedAt"];
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getUsers(filter, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      return emptyRows(res, result, pageInfo);
    });
  });
};

exports.getUser = (req, res) => {
  getUser(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.createUser = (req, res) => {
  createUser(req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.updateUser = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename;
    getUser(req.params.id, (err, result) => {
      if (err) {
        return duplicateKey(err, res);
      }
      const [user] = result.rows;
      if (result.rows.length) {
        fx.ensureFile(`./uploads/${user.picture}`, (err) => {
          if (err) {
            return duplicateKey(err, res);
          }
          fs.rm(`./uploads/${user.picture}`, (err) => {
            if (err) {
              return duplicateKey(err, res);
            }
          });
        });
      } else {
        return duplicateKey(err, res);
      }
    });
  }
  updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};

exports.deleteUser = (req, res) => {
  deleteUser(req.params.id, (err, result) => {
    if (err) {
      return duplicateKey(err, res);
    }
    return emptyRows(res, result);
  });
};
