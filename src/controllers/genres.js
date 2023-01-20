const { getGenres, pageInfo, createGenre, updateGenre, deleteGenre } = require('../models/genres')
const { errorHandling } = require('../helpers/errorHandler')
const filter = require('../helpers/filter')

exports.getGenres = (req, res) => {
  const sortables = ['name', 'createdAt', 'updatedAt']
  filter(req.query, sortables, pageInfo, res, (filter, pageInfo) => {
    getGenres(filter, (err, result) => {
      if (err) {
        return errorHandling(err, res)
      }
      return res.status(200).json({
        success: true,
        message: 'Genres retrieved successfully',
        pageInfo,
        data: result.rows
      })
    })
  })
}

exports.createGenre = (req, res) => {
  createGenre(req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Genre created successfully',
      data: result.rows[0]
    })
  })
}

exports.updateGenre = (req, res) => {
  updateGenre(req.params.id, req.body, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Genre updated successfully',
      data: result.rows[0]
    })
  })
}

exports.deleteGenre = (req, res) => {
  deleteGenre(req.params.id, (err, result) => {
    if (err) {
      return errorHandling(err, res)
    }
    return res.status(200).json({
      success: true,
      message: 'Genre deleted successfully',
      data: result.rows[0]
    })
  })
}
