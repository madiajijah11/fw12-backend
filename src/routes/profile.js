const profileRoutes = require('express').Router()
const profileControllers = require('../controllers/profile')
const uploadImages = require('../middlewares/upload')

profileRoutes.get('/', profileControllers.userProfile)
profileRoutes.patch('/', uploadImages, profileControllers.updateUserProfile)

module.exports = profileRoutes
