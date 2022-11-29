const authRoutes = require("express").Router();
const { login, register, forgotPassword, resetPassword } = require("../controllers/auth");

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.post("/forgotPassword", forgotPassword);
authRoutes.post("/resetPassword", resetPassword);

module.exports = authRoutes;
