const {
  getResetPassword,
  createResetPassword,
  updateResetPassword,
  deleteResetPassword
} = require('../models/resetPassword')
const { errorHandling } = require('../helpers/errorHandler')

exports.getResetPassword = (req, res) => {
  getResetPassword((err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reset Password retrieved successfully',
      data: result.rows
    })
  })
}

exports.createResetPassword = (req, res) => {
  createResetPassword(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reset Password created successfully',
      data: result.rows[0]
    })
  })
}

exports.updateResetPassword = (req, res) => {
  updateResetPassword(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reset Password updated successfully',
      data: result.rows[0]
    })
  })
}

exports.deleteResetPassword = (req, res) => {
  deleteResetPassword(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reset Password deleted successfully',
      data: result.rows[0]
    })
  })
}
