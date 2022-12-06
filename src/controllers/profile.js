const { getUser, updateUser } = require("../models/users");
const jwt = require("jsonwebtoken");
const { errorHandling } = require("../helpers/errorHandler");
const fx = require("fs-extra");
const fs = require("fs");
const responseHandler = require("../helpers/responseHandler");

exports.userProfile = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = decoded;
  getUser(id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "User profile",
      data: result.rows[0],
    });
  });
};

exports.updateUserProfile = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = decoded;
  getUser(id, (err, result) => {
    if (err) {
      return errorHandling(err, res);
    }
    if (req.file) {
      req.body.picture = req.file.filename;
      const [user] = result.rows;
      // check if data not null
      if (user.picture) {
        // check if file exist
        if (fs.existsSync(`uploads/${user.picture}`)) {
          // delete file
          fs.unlinkSync(`uploads/${user.picture}`);
        }
      }
      updateUser(id, req.body, (err, result) => {
        if (err) {
          return errorHandling(err, res);
        }
        return responseHandler(
          200,
          true,
          "User updated successfully",
          null,
          result,
          res
        );
      });
    }
  });
};
