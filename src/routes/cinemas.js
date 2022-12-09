const cinemasRoutes = require("express").Router();
const cinemasController = require("../controllers/cinemas");
const uploadImages = require("../middlewares/upload");

cinemasRoutes.get("/", cinemasController.getCinemas);
cinemasRoutes.get("/:id", cinemasController.getCinema);
cinemasRoutes.post("/", uploadImages, cinemasController.createCinemas);
cinemasRoutes.patch("/:id", uploadImages, cinemasController.updateCinemas);
cinemasRoutes.delete("/:id", cinemasController.deleteCinemas);

module.exports = cinemasRoutes;
