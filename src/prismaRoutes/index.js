const routersV1 = require("express").Router();

routersV1.use("/movies", require("./movies"));
routersV1.use("/months", require("./months"));

module.exports = routersV1;
