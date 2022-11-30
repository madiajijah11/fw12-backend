const routers = require("express").Router();
const { auth } = require("../middlewares/auth");

routers.use("/movies", auth, require("./movies"));
routers.use("/users", require("./users"));
routers.use("/genres", require("./genres"));
routers.use("/roles", require("./roles"));
routers.use("/casts", require("./casts"));
routers.use("/status", require("./status"));
routers.use("/subscribers", require("./subscribers"));
routers.use("/movieCast", require("./movieCast"));
routers.use("/movieGenre", require("./movieGenre"));
routers.use("/movieScheduleTimes", require("./movieScheduleTimes"));
routers.use("/paymentMethods", require("./paymentMethods"));
routers.use("/reserveSeats", require("./reserveSeats"));
routers.use("/resetPassword", require("./resetPassword"));
routers.use("/cinemas", require("./cinemas"));
routers.use("/movieSchedules", require("./movieSchedules"));
routers.use("/transactions", auth, require("./transactions"));

routers.use("/auth", require("./auth"));

routers.use("/profile", auth, require("./profile"));

module.exports = routers;
