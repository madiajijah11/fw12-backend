const moviesRoutes = require("express").Router();
const movieController = require("../controllers/movies");
const { auth } = require("../middlewares/auth");

moviesRoutes.get("/", movieController.getMovies);
moviesRoutes.get("/upcoming", movieController.upComingMovies);
moviesRoutes.get("/nowShowing", movieController.nowShowingMovies);
moviesRoutes.get("/:id", movieController.getMovie);
moviesRoutes.post("/", auth, movieController.createMovie);
moviesRoutes.patch("/:id", auth, movieController.updateMovie);
moviesRoutes.delete("/:id", auth, movieController.deleteMovie);

module.exports = moviesRoutes;
