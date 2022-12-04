const moviesRoutes = require("express").Router();
const movieController = require("../controllers/movies");
const { auth } = require("../middlewares/auth");
const { body, validationResult } = require("express-validator");

moviesRoutes.get("/", movieController.getMovies);
moviesRoutes.get("/upcoming", movieController.upComingMovies);
moviesRoutes.get("/nowShowing", movieController.nowShowingMovies);
moviesRoutes.get("/:id", movieController.getMovie);
moviesRoutes.post(
  "/",
  auth,
  body("title").notEmpty().withMessage("Title is required"),
  body("picture").notEmpty().withMessage("Picture is required"),
  body("releaseDate").notEmpty().withMessage("Release date is required"),
  body("director").notEmpty().withMessage("Director is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("synopsis").notEmpty().withMessage("Synopsis is required"),
  movieController.createMovie
);
moviesRoutes.patch("/:id", auth, movieController.updateMovie);
moviesRoutes.delete("/:id", auth, movieController.deleteMovie);

module.exports = moviesRoutes;
