const moviesRouter = require('express').Router()
const {
  getMovies,
  getMovieById,
  nowShowing,
  upComing,
  getSchedulesByMovieId,
  getSchedulesByCity
} = require('../prismaControllers/movies')

moviesRouter.get('/', getMovies)
moviesRouter.get('/nowShowing', nowShowing)
moviesRouter.get('/upComing', upComing)
moviesRouter.get('/:id/schedules/city', getSchedulesByCity)
moviesRouter.get('/:id/schedules', getSchedulesByMovieId)
moviesRouter.get('/:id', getMovieById)

module.exports = moviesRouter
