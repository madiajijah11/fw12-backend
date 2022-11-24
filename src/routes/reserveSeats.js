const reserveSeatsRoutes = require("express").Router();
const reserveSeatsController = require("../controllers/reserveSeats");

reserveSeatsRoutes.get("/", reserveSeatsController.getReserveSeats);
reserveSeatsRoutes.post("/", reserveSeatsController.createReserveSeats);
reserveSeatsRoutes.patch("/:id", reserveSeatsController.updateReserveSeats);
reserveSeatsRoutes.delete("/:id", reserveSeatsController.deleteReserveSeats);

module.exports = reserveSeatsRoutes;
