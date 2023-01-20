const authRoutes = require('express').Router()
const { login, register, forgotPassword, resetPassword } = require('../controllers/auth')
const { body } = require('express-validator')

authRoutes.post(
  '/register',
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required, and must be a valid phone number'),
  body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      'Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'
    ),
  register
)
authRoutes.post(
  '/login',
  body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
  login
)
authRoutes.post(
  '/forgotPassword',
  body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
  forgotPassword
)
authRoutes.post(
  '/resetPassword',
  body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
  body('code').notEmpty().withMessage('Code is required'),
  body('password')
    .notEmpty()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      'Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'
    ),
  body('confirmPassword').notEmpty().withMessage('Confirm password is required'),
  resetPassword
)

module.exports = authRoutes
