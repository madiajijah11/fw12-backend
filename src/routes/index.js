const routers = require('express').Router()
const { auth } = require('../middlewares/auth')

routers.use('/movies', require('./movies'))
routers.use('/users', auth, require('./users'))
routers.use('/genres', auth, require('./genres'))
routers.use('/roles', auth, require('./roles'))
routers.use('/casts', auth, require('./casts'))
routers.use('/status', auth, require('./status'))
routers.use('/subscribers', require('./subscribers'))
routers.use('/movieCast', auth, require('./movieCast'))
routers.use('/movieGenre', auth, require('./movieGenre'))
routers.use('/movieScheduleTimes', auth, require('./movieScheduleTimes'))
routers.use('/paymentMethods', auth, require('./paymentMethods'))
routers.use('/reserveSeats', auth, require('./reserveSeats'))
routers.use('/resetPassword', auth, require('./resetPassword'))
routers.use('/cinemas', auth, require('./cinemas'))
routers.use('/movieSchedules', auth, require('./movieSchedules'))
routers.use('/transactions', auth, require('./transactions'))

routers.use('/auth', require('./auth'))

routers.use('/profile', auth, require('./profile'))

module.exports = routers
