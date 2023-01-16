const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mexlcinema",
    format: async (req, file) => path.extname(file.originalname).slice(1),
    public_id: (req, file) => {
      const randomNumber = Math.floor(Math.random() * 90000);
      return `${randomNumber}-${Date.now()}`;
    },
  },
});

const upload = multer({ storage }).single("picture");

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next();
  });
};
