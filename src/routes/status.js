const statusRoutes = require("express").Router();
const statusController = require("../controllers/status");

statusRoutes.get("/", statusController.getStatus);
statusRoutes.post("/", statusController.createStatus);
statusRoutes.patch("/:id", statusController.updateStatus);
statusRoutes.delete("/:id", statusController.deleteStatus);

module.exports = statusRoutes;
