const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
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
    req.body.picture = req.file.path;
    const userData = await prisma.users.findUnique({
      where: {
        id: parseInt(user.id),
      },
    });
    if (user.picture) {
      const fileName = userData?.picture?.split("/").pop()?.split(".")[0];
      cloudinary.uploader.destroy(`mexlcinema/${fileName}`);
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
  }
};

exports.changePassword = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  try {
    const changePassword = await prisma.users.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        password: await bcrypt.hash(req.body.newPassword, 10),
      },
    });
    res.status(200).json({
      status: true,
      message: "Password changed successfully",
      results: changePassword,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
