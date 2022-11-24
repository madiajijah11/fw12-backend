const rolesRoutes = require("express").Router();
const roleController = require("../controllers/roles");

rolesRoutes.get("/", roleController.getRoles);
rolesRoutes.post("/", roleController.createRole);
rolesRoutes.patch("/:id", roleController.updateRole);
rolesRoutes.delete("/:id", roleController.deleteRole);

module.exports = rolesRoutes;
