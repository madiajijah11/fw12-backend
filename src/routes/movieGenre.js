const movieGenreRoutes = require('express').Router()
const movieGenreController = require('../controllers/movieGenre')

movieGenreRoutes.get('/', movieGenreController.getMovieGenre)
movieGenreRoutes.post('/', movieGenreController.createMovieGenre)
movieGenreRoutes.patch('/:id', movieGenreController.updateMovieGenre)
movieGenreRoutes.delete('/:id', movieGenreController.deleteMovieGenre)

module.exports = movieGenreRoutes
