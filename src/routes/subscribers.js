const subscribersRoutes = require("express").Router();
const subscribersController = require("../controllers/subscribers");

subscribersRoutes.get("/", subscribersController.getSubscribers);
subscribersRoutes.post("/", subscribersController.createSubscribers);
subscribersRoutes.patch("/:id", subscribersController.updateSubscribers);
subscribersRoutes.delete("/:id", subscribersController.deleteSubscribers);

module.exports = subscribersRoutes;
