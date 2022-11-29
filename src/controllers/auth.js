const { getUserByEmail, createUser } = require("../models/users");
const jwt = require("jsonwebtoken");
const { duplicateKey } = require("../helpers/errorHandler");

exports.login = (req, res) => {
  getUserByEmail(req.body.email, (err, { rows }) => {
    if (err) {
      return duplicateKey(err, res);
    }
    if (rows.length) {
      const [user] = rows;
      if (req.body.password === user.password) {
        const token = jwt.sign({ id: user.id }, "secret");
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
    const token = jwt.sign({ id: user }, "secret");
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
  const code = Math.floor(Math.random() * 90000) + 10000;
  // const data = {
  //   email,
  //   code,
  // };
  getUserByEmail(email, (err, data) => {
    console.log(data);
    if (err) {
      return duplicateKey(err, res);
    }
  });
};
