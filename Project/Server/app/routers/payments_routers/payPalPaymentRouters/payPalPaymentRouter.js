const express = require("express");
const router = express.Router();
const { payment } = require("../../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../../routerErrorHandler");

const {
  PayPalPaymentController,
  PayPalService,
  PaymentValidator,
  CurrencyExchangeService,
} = require("../../../controllers/controllersContainer");

const { CustomersOrdersDAO } = require("../../../daos/daosContainer");

//#region  INIT

const dao = new CustomersOrdersDAO();
const service = new PayPalService(payment.paypal);
const validator = new PaymentValidator();
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
