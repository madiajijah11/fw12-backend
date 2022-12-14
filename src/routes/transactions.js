const transactionsRoutes = require("express").Router();
const transactionsController = require("../controllers/transactions");

transactionsRoutes.get("/", transactionsController.getTransactions);
transactionsRoutes.get("/history", transactionsController.transactionHistory);
transactionsRoutes.get("/ticket/:id", transactionsController.ticketDetails);
transactionsRoutes.get("/:id", transactionsController.getTransaction);
transactionsRoutes.post("/", transactionsController.createTransactions);
transactionsRoutes.post("/checkout", transactionsController.checkout);
transactionsRoutes.patch("/:id", transactionsController.updateTransactions);
transactionsRoutes.delete("/:id", transactionsController.deleteTransactions);

module.exports = transactionsRoutes;
