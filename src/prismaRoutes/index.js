const routersV1 = require("express").Router();
const { auth } = require("../middlewares/auth");

routersV1.use("/movies", require("./movies"));
routersV1.use("/months", require("./months"));
routersV1.use("/profile", auth, require("./profile"));

module.exports = routersV1;
