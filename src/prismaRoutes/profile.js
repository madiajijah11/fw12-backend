const profileRouter = require("express").Router();
const cloudinary = require("../middlewares/cloudinary");
const {
  getProfile,
  editProfile,
  uploadProfileImage,
} = require("../prismaControllers/profile");

profileRouter.get("/", getProfile);
profileRouter.patch("/edit", editProfile);
profileRouter.patch("/upload", cloudinary, uploadProfileImage);

module.exports = profileRouter;
