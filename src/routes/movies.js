const moviesRoutes = require("express").Router();
const movieController = require("../controllers/movies");

moviesRoutes.get("/", movieController.getMovies);
moviesRoutes.get("/upcoming", movieController.upComingMovies);
moviesRoutes.get("/nowShowing", movieController.nowShowingMovies);
moviesRoutes.get("/:id", movieController.getMovie);
moviesRoutes.post("/", movieController.createMovie);
moviesRoutes.patch("/:id", movieController.updateMovie);
moviesRoutes.delete("/:id", movieController.deleteMovie);

module.exports = moviesRoutes;
