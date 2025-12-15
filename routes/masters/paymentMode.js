const { authenticateToken } = require("../../authentication/auth");
const {
  usp_PaymentMode_Save,
  usp_PaymentMode_Browse,
  usp_PaymentMode_Preview,
  usp_PaymentMode_Delete,
} = require("../../controller/Masters/payment-mode");

const masterPaymentModeRoutes = require("express").Router();

masterPaymentModeRoutes.post("/usp_PaymentMode_Save", usp_PaymentMode_Save);
masterPaymentModeRoutes.post("/usp_PaymentMode_Browse", usp_PaymentMode_Browse);
masterPaymentModeRoutes.post(
  "/usp_PaymentMode_Preview",
  usp_PaymentMode_Preview
);
masterPaymentModeRoutes.post("/usp_PaymentMode_Delete", usp_PaymentMode_Delete);

module.exports = { masterPaymentModeRoutes };
