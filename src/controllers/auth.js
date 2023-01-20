const { getUserByEmail, createUser, updateUser } = require('../models/users')
const jwt = require('jsonwebtoken')
const { errorHandling } = require('../helpers/errorHandler')
const {
  createResetPassword,
  selectEmailAndCode,
  deleteResetPassword
} = require('../models/resetPassword')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const responseHandler = require('../helpers/responseHandler')

exports.register = (req, res) => {
  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    return responseHandler(
      400,
      false,
      'All fields must be filled',
      null,
      validationError.array(),
      res
    )
  }
  const data = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
    roleId: req.body.roleId || 2
  }
  getUserByEmail(data.email, (err, { rows }) => {
    if (err) {
      return errorHandling(err, res)
    }
    if (rows.length) {
      return responseHandler(409, false, 'Email already registered', null, null, res)
    } else {
      createUser(data, (err, data) => {
        if (err) {
          return errorHandling(err, res)
        }
        const { rows: users } = data
        const [user] = users
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: '1d'
        })
        return responseHandler(201, true, 'Register success', null, { token }, res)
      })
    }
  })
}

exports.login = (req, res) => {
  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    return responseHandler(
      400,
      false,
      'All fields must be filled',
      null,
      validationError.array(),
      res
    )
  }
  getUserByEmail(req.body.email, (err, { rows }) => {
    if (err) {
      return errorHandling(err, res)
    }
    if (rows.length) {
      const [user] = rows
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: '1d'
        })
        return responseHandler(200, true, 'Login success', null, { token }, res)
      } else {
        return responseHandler(400, false, 'Invalid email or password', null, null, res)
      }
    } else {
      return responseHandler(400, false, 'Invalid email or password', null, null, res)
    }
  })
}

exports.forgotPassword = (req, res) => {
  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    return responseHandler(
      400,
      false,
      'All fields must be filled',
      null,
      validationError.array(),
      res
    )
  }
  const { email } = req.body
  getUserByEmail(email, (err, data) => {
    if (err) {
      return errorHandling(err, res)
    }
    if (data.rows.length) {
      const dataReset = {
        email,
        userId: data.rows[0].id,
        code: Math.floor(Math.random() * 90000) + 10000
      }
      createResetPassword(dataReset, (err, data) => {
        if (err) {
          return errorHandling(err, res)
        }
        if (data.rows.length) {
          return responseHandler(200, true, 'Request has been sent', null, null, res)
        }
      })
    } else {
      return responseHandler(404, false, 'User not found', null, null, res)
    }
  })
}

exports.resetPassword = (req, res) => {
  const validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    return responseHandler(
      400,
      false,
      'All fields must be filled',
      null,
      validationError.array(),
      res
    )
  }
  const { password, confirmPassword } = req.body
  if (password === confirmPassword) {
    const encryptedPassword = bcrypt.hashSync(password, 10)
    selectEmailAndCode(req.body, (err, data) => {
      if (err) {
        return errorHandling(err, res)
      }
      if (data) {
        updateUser(data.userId, encryptedPassword, (err, data) => {
          if (err) {
            return errorHandling(err, res)
          }
          if (data) {
            deleteResetPassword(data.id, (err, data) => {
              if (err) {
                return errorHandling(err, res)
              }
              if (data.rows.length) {
                return responseHandler(200, true, 'Password has been changed', null, null, res)
              }
            })
          }
        })
      } else {
        return responseHandler(404, false, 'Wrong email or invalid code', null, null, res)
      }
    })
  } else {
    return responseHandler(406, false, 'Password not match', null, null, res)
  }
}
