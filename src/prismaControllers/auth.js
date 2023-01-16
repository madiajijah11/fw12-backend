const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, roleId } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isEmailAndPhoneExist = await prisma.users.findMany({
      where: {
        OR: [
          {
            email: email,
          },
          {
            phoneNumber: phoneNumber,
          },
        ],
      },
    });
    if (isEmailAndPhoneExist.length) {
      return res.status(409).json({
        status: false,
        message: "Email or phone number already registered",
      });
    }
    const user = await prisma.users.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: hashedPassword,
        roleId: roleId || 2,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      status: true,
      message: "Register success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Wrong Email or Password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: false,
        message: "Wrong Email or Password",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      status: true,
      message: "Login success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
