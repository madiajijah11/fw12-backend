const usersRoutes = require("express").Router();
const userController = require("../controllers/users");

usersRoutes.get("/", userController.getUsers);
usersRoutes.get("/:id", userController.getUser);
usersRoutes.post("/", userController.createUser);
usersRoutes.patch("/:id", userController.updateUser);
usersRoutes.delete("/:id", userController.deleteUser);

module.exports = usersRoutes;
