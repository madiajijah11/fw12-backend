const cinemasRoutes = require("express").Router();
const cinemasController = require("../controllers/cinemas");

cinemasRoutes.get("/", cinemasController.getCinemas);
cinemasRoutes.get("/:id", cinemasController.getCinema);
cinemasRoutes.post("/", cinemasController.createCinemas);
cinemasRoutes.patch("/:id", cinemasController.updateCinemas);
cinemasRoutes.delete("/:id", cinemasController.deleteCinemas);

module.exports = cinemasRoutes;
