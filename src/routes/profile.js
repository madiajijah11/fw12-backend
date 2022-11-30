const profileRoutes = require("express").Router();
const usersControllers = require("../controllers/users");
const uploadImages = require("../middlewares/upload");

profileRoutes.get("/:id", usersControllers.getUser);
profileRoutes.patch("/:id", uploadImages, usersControllers.updateUser);

module.exports = profileRoutes;
