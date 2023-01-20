const monthsRouter = require('express').Router()
const { getMonths } = require('../prismaControllers/months')

monthsRouter.get('/', getMonths)

module.exports = monthsRouter
