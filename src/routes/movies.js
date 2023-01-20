const moviesRoutes = require('express').Router()
const movieController = require('../controllers/movies')
const { auth } = require('../middlewares/auth')
const { body } = require('express-validator')
const uploadImage = require('../middlewares/upload')

moviesRoutes.get('/', movieController.getMovies)
moviesRoutes.get('/upcoming', movieController.upComingMovies)
moviesRoutes.get('/nowShowing', movieController.nowShowingMovies)
moviesRoutes.get('/bookedSeats', movieController.bookedSeats)
moviesRoutes.get('/:id', movieController.getMovie)
moviesRoutes.get('/:id/schedules/city', movieController.getScheduleByCity)
moviesRoutes.get('/:id/schedules', movieController.getScheduleByMovieId)
moviesRoutes.post(
  '/',
  auth,
  uploadImage,
  body('title').notEmpty().withMessage('Title is required'),
  body('releaseDate').notEmpty().withMessage('Release date is required'),
  body('director').notEmpty().withMessage('Director is required'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('synopsis').notEmpty().withMessage('Synopsis is required'),
  movieController.createMovie
)
moviesRoutes.patch('/:id', auth, uploadImage, movieController.updateMovie)
moviesRoutes.delete('/:id', auth, movieController.deleteMovie)

module.exports = moviesRoutes
