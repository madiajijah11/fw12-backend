const { getUserByEmail, createUser, updateUser } = require("../models/users");
const jwt = require("jsonwebtoken");
const { duplicateKey } = require("../helpers/errorHandler");
const {
  createResetPassword,
  selectEmailAndCode,
  deleteResetPassword,
} = require("../models/resetPassword");

exports.login = (req, res) => {
  getUserByEmail(req.body.email, (err, { rows }) => {
    if (err) {
      return duplicateKey(err, res);
    }
    if (rows.length) {
      const [user] = rows;
      if (req.body.password === user.password) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return res.status(200).json({
          success: true,
          message: "Login success",
          data: {
            token,
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Wrong email or password",
        });
      }
    }
  });
};

exports.register = (req, res) => {
  createUser(req.body, (err, data) => {
    if (err) {
      return duplicateKey(err, res);
    }
    const { rows: users } = data;
    const [user] = users;
    const token = jwt.sign({ id: user }, process.env.SECRET_KEY);
    return res.status(201).json({
      success: true,
      message: "Register success",
      data: {
        token,
      },
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  getUserByEmail(email, (err, data) => {
    if (err) {
      return duplicateKey(err, res);
    }
    if (data.rows.length) {
      const dataReset = {
        email,
        userId: data.rows[0].id,
        code: Math.floor(Math.random() * 90000) + 10000,
      };
      createResetPassword(dataReset, (err, data) => {
        if (err) {
          return duplicateKey(err, res);
        }
        if (data.rows.length) {
          return res.status(200).json({
            success: true,
            message: "Reset request has been sent",
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  });
};

exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    selectEmailAndCode(req.body, (err, data) => {
      if (err) {
        return duplicateKey(err, res);
      }
      if (data.rows.length) {
        updateUser(data.rows[0].userId, { password }, (err, data) => {
          if (err) {
            return duplicateKey(err, res);
          }
          if (data.rows.length) {
            deleteResetPassword(data.rows[0].id, (err, data) => {
              if (err) {
                return duplicateKey(err, res);
              }
              if (data.rows.length) {
                return res.status(200).json({
                  success: true,
                  message: "Reset password success",
                });
              }
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Password not match",
    });
  }
};
