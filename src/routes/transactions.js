const transactionsRoutes = require("express").Router();
const transactionsController = require("../controllers/transactions");

transactionsRoutes.get("/", transactionsController.getTransactions);
transactionsRoutes.get("/:id", transactionsController.getTransaction);
transactionsRoutes.post("/", transactionsController.createTransactions);
transactionsRoutes.patch("/:id", transactionsController.updateTransactions);
transactionsRoutes.delete("/:id", transactionsController.deleteTransactions);

module.exports = transactionsRoutes;
