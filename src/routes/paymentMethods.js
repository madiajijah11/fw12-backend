const paymentMethodsRoutes = require("express").Router();
const paymentMethodsController = require("../controllers/paymentMethods");

paymentMethodsRoutes.get("/", paymentMethodsController.getPaymentMethods);
paymentMethodsRoutes.post("/", paymentMethodsController.createPaymentMethods);
paymentMethodsRoutes.patch(
  "/:id",
  paymentMethodsController.updatePaymentMethods
);
paymentMethodsRoutes.delete(
  "/:id",
  paymentMethodsController.deletePaymentMethods
);

module.exports = paymentMethodsRoutes;
