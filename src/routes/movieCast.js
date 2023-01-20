const movieCastRoutes = require('express').Router()
const movieCastController = require('../controllers/movieCast')

movieCastRoutes.get('/', movieCastController.getMovieCast)
movieCastRoutes.post('/', movieCastController.createMovieCast)
movieCastRoutes.patch('/:id', movieCastController.updateMovieCast)
movieCastRoutes.delete('/:id', movieCastController.deleteMovieCast)

module.exports = movieCastRoutes
