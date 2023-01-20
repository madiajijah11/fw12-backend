const {
  getTransactions,
  getTransaction,
  pageInfo,
  createTransactions,
  updateTransactions,
  deleteTransactions,
  checkout,
  transactionHistory,
  ticketDetails
} = require('../models/transactions')
const { errorHandling } = require('../helpers/errorHandler')
const filter = require('../helpers/filter')
const jwt = require('jsonwebtoken')
const responseHandler = require('../helpers/responseHandler')

exports.getTransactions = (req, res) => {
  const sortables = ['fullName', 'createdAt', 'updatedAt']
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getTransactions(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res)
      }
      return res.status(200).json({
        success: true,
        message: 'Transactions retrieved successfully',
        pageInfo,
        data: result.rows
      })
    })
  })
}

exports.getTransaction = (req, res) => {
  getTransaction(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Transaction retrieved successfully',
      data: result.rows[0]
    })
  })
}

exports.createTransactions = (req, res) => {
  createTransactions(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Transaction created successfully',
      data: result.rows[0]
    })
  })
}

exports.updateTransactions = (req, res) => {
  updateTransactions(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: result.rows[0]
    })
  })
}

exports.deleteTransactions = (req, res) => {
  deleteTransactions(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
      data: result.rows[0]
    })
  })
}

exports.checkout = (req, res) => {
  const authorization = req.headers.authorization
  const token = authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  const { id } = decoded
  const transaction = {
    userId: id,
    bookingDate: req.body.bookingDate,
    bookingTime: req.body.bookingTime,
    movieId: req.body.movieId,
    cinemaId: req.body.cinemaId,
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    paymentMethodId: req.body.paymentMethodId,
    seatNum: req.body.seatNum
  }
  checkout(transaction, (err, result) => {
    console.log(err)
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Transaction checkout successfully',
      data: result
    })
  })
}

exports.transactionHistory = (req, res) => {
  const authorization = req.headers.authorization
  const token = authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  const { id } = decoded
  transactionHistory(id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return responseHandler(
      200,
      true,
      'Transaction history retrieved successfully',
      null,
      result,
      res
    )
  })
}

exports.ticketDetails = (req, res) => {
  ticketDetails(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return responseHandler(200, true, 'Ticket details retrieved successfully', null, result, res)
  })
}
