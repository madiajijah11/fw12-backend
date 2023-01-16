const profileRouter = require("express").Router();
const {
  getProfile,
  editProfile,
  uploadProfileImage,
} = require("../prismaControllers/profile");

profileRouter.get("/", getProfile);
profileRouter.patch("/edit", editProfile);
profileRouter.patch("/upload", uploadProfileImage);

module.exports = profileRouter;
