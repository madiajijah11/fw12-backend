const routers = require("express").Router();
const castsRoutes = require("./casts");
const genresRoutes = require("./genres");
const moviesRoutes = require("./movies");
const rolesRoutes = require("./roles");
const usersRoutes = require("./users");
const statusRoutes = require("./status");
const subscribersRoutes = require("./subscribers");
const movieCastRoutes = require("./movieCast");
const movieGenreRoutes = require("./movieGenre");

routers.use("/movies", moviesRoutes);
routers.use("/users", usersRoutes);
routers.use("/genres", genresRoutes);
routers.use("/roles", rolesRoutes);
routers.use("/casts", castsRoutes);
routers.use("/status", statusRoutes);
routers.use("/subscribers", subscribersRoutes);
routers.use("/movieCast", movieCastRoutes);
routers.use("/movieGenre", movieGenreRoutes);

module.exports = routers;
