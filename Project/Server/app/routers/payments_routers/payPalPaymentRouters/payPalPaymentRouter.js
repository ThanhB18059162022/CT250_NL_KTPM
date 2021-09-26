const express = require("express");
const router = express.Router();
const { payment } = require("../../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../../routerErrorHandler");

const {
  PaymentsValidator,
} = require("../../../validators/validatorsContainer");
const {
  PayPalService,
  CurrencyExchangeService,
} = require("../../../services/servicesContainer");
const { CustomersOrdersDAO } = require("../../../daos/daosContainer");
const {
  PayPalPaymentController,
} = require("../../../controllers/controllersContainer");

//#region  INIT

const dao = new CustomersOrdersDAO();
const service = new PayPalService(payment.paypal);
const validator = new PaymentsValidator();
const exService = new CurrencyExchangeService(payment.currency);
const controller = new PayPalPaymentController(
  validator,
  dao,
  exService,
  service
);

//#endregion

router.route("/clientId").get(errorCatch(controller.getClientId));

router.route("/createOrder").post(errorCatch(controller.createOrder));

// Thanh toán order
router.route("/captureOrder/:orderID").get(errorCatch(controller.captureOrder));

// Lấy ra order đã thanh toán
router
  .route("/getSaveOrder/:saveOrderId")
  .get(errorCatch(controller.getSaveOrder));

module.exports = router;
