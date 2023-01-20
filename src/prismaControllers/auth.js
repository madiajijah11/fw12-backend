const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD
  }
})

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, roleId } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const isEmailAndPhoneExist = await prisma.users.findMany({
      where: {
        OR: [
          {
            email
          },
          {
            phoneNumber
          }
        ]
      }
    })
    if (isEmailAndPhoneExist.length) {
      return res.status(409).json({
        status: false,
        message: 'Email or phone number already registered'
      })
    }
    const user = await prisma.users.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        roleId: roleId || 2
      }
    })
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    })
    return res.status(201).json({
      status: true,
      message: 'Register success',
      token
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Wrong Email or Password'
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: false,
        message: 'Wrong Email or Password'
      })
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    })
    return res.status(200).json({
      status: true,
      message: 'Login success',
      token
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Email not found'
      })
    }
    const randomNum = Math.floor(Math.random() * 90000) + 10000
    await prisma.resetPassword.create({
      data: {
        email,
        code: randomNum.toString()
      }
    })
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Reset Password',
      html: `<h1>Reset Password</h1>
      <p>Use this code to reset your password</p>
      <h2>${randomNum}</h2>`
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          status: false,
          message: 'Internal server error'
        })
      } else {
        return res.status(200).json({
          status: true,
          message: 'Code has been sent to your email'
        })
      }
    })
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        status: false,
        message: 'Email already asked for reset password'
      })
    }
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Email not found'
      })
    }
    const isCodeMatch = await prisma.resetPassword.findFirst({
      where: {
        email,
        code
      }
    })
    if (!isCodeMatch) {
      return res.status(401).json({
        status: false,
        message: 'Invalid code'
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.users.update({
      where: {
        id: parseInt(user.id)
      },
      data: {
        password: hashedPassword
      }
    })
    const findEmailAndCode = await prisma.resetPassword.findFirst({
      where: {
        email,
        code
      }
    })
    await prisma.resetPassword.delete({
      where: {
        id: findEmailAndCode.id
      }
    })
    return res.status(200).json({
      status: true,
      message: 'Reset password success'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}
