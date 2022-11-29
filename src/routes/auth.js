const authRoutes = require("express").Router();
const { login, register } = require("../controllers/auth");

authRoutes.post("/login", login);
authRoutes.post("/register", register);

module.exports = authRoutes;
