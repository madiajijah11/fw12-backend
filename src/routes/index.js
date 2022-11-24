const routers = require("express").Router();
const genresRoutes = require("./genres");
const moviesRoutes = require("./movies");
const rolesRoutes = require("./roles");
const usersRoutes = require("./users");

routers.use("/movies", moviesRoutes);
routers.use("/users", usersRoutes);
routers.use("/genres", genresRoutes);
routers.use("/roles", rolesRoutes);

module.exports = routers;
