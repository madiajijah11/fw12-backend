const castsRoutes = require('express').Router()
const castController = require('../controllers/casts')

castsRoutes.get('/', castController.getCasts)
castsRoutes.post('/', castController.createCast)
castsRoutes.patch('/:id', castController.updateCast)
castsRoutes.delete('/:id', castController.deleteCast)

module.exports = castsRoutes
