const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.editProfile = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  try {
    const editProfile = await prisma.users.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        firstName: req.body.name,
        lastName: req.body.lastName,
        phoneNumber: req.body.phone,
        email: req.body.email,
      },
    });
    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      results: editProfile,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getProfile = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  try {
    const getProfile = await prisma.users.findUnique({
      where: {
        id: parseInt(user.id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Profile retrieved successfully",
      results: getProfile,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  if (req.file) {
    req.body.picture = req.file.filename;
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(user.id),
      },
    });
    if (user.picture) {
      const fileName = user.picture.split("/")[1].split(".")[0];
      cloudinary.uploader.destroy(`mexlcinema/${fileName}`);
    }
  }
  try {
    const uploadProfileImage = await prisma.users.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        picture: req.body.picture,
      },
    });
    res.status(200).json({
      status: true,
      message: "Profile image uploaded successfully",
      results: uploadProfileImage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
