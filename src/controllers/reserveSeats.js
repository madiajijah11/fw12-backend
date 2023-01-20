const {
  getReserveSeats,
  createReserveSeats,
  updateReserveSeats,
  deleteReserveSeats
} = require('../models/reserveSeats')
const { errorHandling } = require('../helpers/errorHandler')

exports.getReserveSeats = (req, res) => {
  getReserveSeats((err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reserve Seats retrieved successfully',
      data: result.rows
    })
  })
}

exports.createReserveSeats = (req, res) => {
  createReserveSeats(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reserve Seats created successfully',
      data: result.rows[0]
    })
  })
}

exports.updateReserveSeats = (req, res) => {
  updateReserveSeats(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reserve Seats updated successfully',
      data: result.rows[0]
    })
  })
}

exports.deleteReserveSeats = (req, res) => {
  deleteReserveSeats(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Reserve Seats deleted successfully',
      data: result.rows[0]
    })
  })
}
