const authRouter = require('express').Router()
const { register, login, forgotPassword, resetPassword } = require('../prismaControllers/auth')
const { rules, validate } = require('../middlewares/validator')

authRouter.post('/register', rules('register'), validate, register)
authRouter.post('/login', rules('login'), validate, login)
authRouter.post('/forgotPassword', rules('forgotPassword'), validate, forgotPassword)
authRouter.post('/resetPassword', rules('resetPassword'), validate, resetPassword)

module.exports = authRouter
