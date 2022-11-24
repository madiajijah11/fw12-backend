const movieScheduleTimesRoutes = require("express").Router();
const movieScheduleTimesController = require("../controllers/movieScheduleTimes");

movieScheduleTimesRoutes.get(
  "/",
  movieScheduleTimesController.getMovieScheduleTimes
);
movieScheduleTimesRoutes.post(
  "/",
  movieScheduleTimesController.createMovieScheduleTimes
);
movieScheduleTimesRoutes.patch(
  "/:id",
  movieScheduleTimesController.updateMovieScheduleTimes
);
movieScheduleTimesRoutes.delete(
  "/:id",
  movieScheduleTimesController.deleteMovieScheduleTimes
);

module.exports = movieScheduleTimesRoutes;
