const resetPasswordRoutes = require('express').Router()
const resetPasswordController = require('../controllers/resetPassword')

resetPasswordRoutes.get('/', resetPasswordController.getResetPassword)
resetPasswordRoutes.post('/', resetPasswordController.createResetPassword)
resetPasswordRoutes.patch('/:id', resetPasswordController.updateResetPassword)
resetPasswordRoutes.delete('/:id', resetPasswordController.deleteResetPassword)

module.exports = resetPasswordRoutes
