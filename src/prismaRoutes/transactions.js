const transactionsRouter = require("express").Router();
const { checkout } = require("../prismaControllers/transactions");

transactionsRouter.post("/checkout", checkout);

module.exports = transactionsRouter;
