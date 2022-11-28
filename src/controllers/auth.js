const { getUserByEmail } = require("../models/users");
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
