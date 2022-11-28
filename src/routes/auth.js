const authRoutes = require("express").Router();
const { createUser } = require("../controllers/users");
const { login } = require("../controllers/auth");

authRoutes.post("/login", login);
authRoutes.post("/register", createUser);

module.exports = authRoutes;
