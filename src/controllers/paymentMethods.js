const {
  getPaymentMethods,
  createPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods
} = require('../models/paymentMethods')
const { errorHandling } = require('../helpers/errorHandler')

exports.getPaymentMethods = (req, res) => {
  getPaymentMethods((err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Payment Methods retrieved successfully',
      data: result.rows
    })
  })
}

exports.createPaymentMethods = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename
  }
  createPaymentMethods(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Payment Method created successfully',
      data: result.rows[0]
    })
  })
}

exports.updatePaymentMethods = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename
  }
  updatePaymentMethods(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Payment Method updated successfully',
      data: result.rows[0]
    })
  })
}

exports.deletePaymentMethods = (req, res) => {
  deletePaymentMethods(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Payment Method deleted successfully',
      data: result.rows[0]
    })
  })
}
