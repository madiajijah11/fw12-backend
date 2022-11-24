const genresRoutes = require("express").Router();
const genreController = require("../controllers/genres");

genresRoutes.get("/", genreController.getGenres);
genresRoutes.post("/", genreController.createGenre);
genresRoutes.patch("/:id", genreController.updateGenre);
genresRoutes.delete("/:id", genreController.deleteGenre);

module.exports = genresRoutes;
