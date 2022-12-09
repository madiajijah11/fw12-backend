const paymentMethodsRoutes = require("express").Router();
const paymentMethodsController = require("../controllers/paymentMethods");
const uploadImages = require("../middlewares/upload");

paymentMethodsRoutes.get("/", paymentMethodsController.getPaymentMethods);
paymentMethodsRoutes.post(
  "/",
  uploadImages,
  paymentMethodsController.createPaymentMethods
);
paymentMethodsRoutes.patch(
  "/:id",
  uploadImages,
  paymentMethodsController.updatePaymentMethods
);
paymentMethodsRoutes.delete(
  "/:id",
  paymentMethodsController.deletePaymentMethods
);

module.exports = paymentMethodsRoutes;
