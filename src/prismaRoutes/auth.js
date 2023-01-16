const authRouter = require("express").Router();
const { register, login } = require("../prismaControllers/auth");
const { rules, validate } = require("../middlewares/validator");

authRouter.post("/register", rules("register"), validate, register);
authRouter.post("/login", rules("login"), validate, login);

module.exports = authRouter;
