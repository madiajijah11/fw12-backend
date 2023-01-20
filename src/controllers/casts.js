const { getCasts, pageInfo, createCast, updateCast, deleteCast } = require('../models/casts')
const { errorHandling } = require('../helpers/errorHandler')
const filter = require('../helpers/filter')

exports.getCasts = (req, res) => {
  const sortables = ['name', 'createdAt', 'updatedAt']
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getCasts(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res)
      }
      return res.status(200).json({
        success: true,
        message: 'Casts retrieved successfully',
        pageInfo,
        data: result.rows
      })
    })
  })
}

exports.createCast = (req, res) => {
  createCast(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Cast created successfully',
      data: result.rows[0]
    })
  })
}

exports.updateCast = (req, res) => {
  updateCast(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Cast updated successfully',
      data: result.rows[0]
    })
  })
}

exports.deleteCast = (req, res) => {
  deleteCast(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Cast deleted successfully',
      data: result.rows[0]
    })
  })
}
