const routers = require("express").Router();
const movieRoutes = require("./movies");
const userRoutes = require("./users");

routers.use("/movies", movieRoutes);
routers.use("/users", userRoutes);

module.exports = routers;
