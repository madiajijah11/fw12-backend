const routersV1 = require('express').Router()
const { auth } = require('../middlewares/auth')

routersV1.use('/movies', require('./movies'))
routersV1.use('/months', require('./months'))
routersV1.use('/profile', auth, require('./profile'))
routersV1.use('/auth', require('./auth'))
routersV1.use('/transactions', auth, require('./transactions'))

module.exports = routersV1
