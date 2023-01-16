const profileRouter = require("express").Router();
const cloudinary = require("../middlewares/cloudinary");
const {
  getProfile,
  editProfile,
  uploadProfileImage,
  changePassword,
} = require("../prismaControllers/profile");

profileRouter.get("/", getProfile);
profileRouter.patch("/edit", editProfile);
profileRouter.patch("/upload", cloudinary, uploadProfileImage);
profileRouter.patch("/changePassword", changePassword);

module.exports = profileRouter;
