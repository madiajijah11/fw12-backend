const {
  getCinemas,
  getCinema,
  pageInfo,
  createCinemas,
  updateCinemas,
  deleteCinemas
} = require('../models/cinemas')
const { errorHandling } = require('../helpers/errorHandler')
const filter = require('../helpers/filter')
const responseHandler = require('../helpers/responseHandler')

exports.getCinemas = (req, res) => {
  const sortables = ['name', 'createdAt', 'updatedAt']
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getCinemas(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res)
      }
      return res.status(200).json({
        success: true,
        message: 'Cinemas retrieved successfully',
        pageInfo,
        data: result.rows
      })
    })
  })
}

exports.getCinema = (req, res) => {
  getCinema(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Cinema retrieved successfully',
      data: result.rows[0]
    })
  })
}

exports.createCinemas = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename
  }
  createCinemas(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Cinema created successfully',
      data: result.rows[0]
    })
  })
}

exports.updateCinemas = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename
  }
  updateCinemas(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return responseHandler(200, true, 'Cinema updated successfully', null, result.rows[0], res)
  })
}

exports.deleteCinemas = (req, res) => {
  deleteCinemas(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Cinema deleted successfully',
      data: result.rows[0]
    })
  })
}
