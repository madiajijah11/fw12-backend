const movieSchedulesRoutes = require("express").Router();
const movieSchedulesController = require("../controllers/movieSchedules");

movieSchedulesRoutes.get("/", movieSchedulesController.getMovieSchedules);
movieSchedulesRoutes.get("/:id", movieSchedulesController.getMovieSchedule);
movieSchedulesRoutes.post("/", movieSchedulesController.createMovieSchedules);
movieSchedulesRoutes.patch(
  "/:id",
  movieSchedulesController.updateMovieSchedules
);
movieSchedulesRoutes.delete(
  "/:id",
  movieSchedulesController.deleteMovieSchedules
);

module.exports = movieSchedulesRoutes;
