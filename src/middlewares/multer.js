const multer = require("multer");
const { duplicateKey } = require("../helpers/errorHandler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const filename = `${new Date().getDate()}_${new Date().getTime()}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

const uploadImage = upload.single("picture");

module.exports = (req, res, next) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return duplicateKey(err, res);
    }
    next();
  });
};
