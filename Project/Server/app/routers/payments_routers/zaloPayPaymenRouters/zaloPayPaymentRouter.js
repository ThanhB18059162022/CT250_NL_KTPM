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
  ApiCaller,
  ZaloPayService,
  CurrencyExchangeService,
} = require("../../../services/servicesContainer");
const { CustomersOrdersDAO } = require("../../../daos/daosContainer");
const {
  ZaloPayPaymentController,
} = require("../../../controllers/controllersContainer");

//#region  INIT

const dao = new CustomersOrdersDAO();
const apiCaller = new ApiCaller();
const service = new ZaloPayService(payment.zalo, apiCaller);
const validator = new PaymentsValidator();
const exService = new CurrencyExchangeService(payment.currency);
const controller = new ZaloPayPaymentController(
  validator,
  dao,
  exService,
  service
);

//#endregion

router.route("/createOrder").post(errorCatch(controller.createOrder));

// Thanh toán đơn hàng
router.route("/checkoutOrder/:id").get(errorCatch(controller.checkoutOrder));

// Lấy đơn hàng đã lưu
router
  .route("/getSaveOrder/:saveOrderId")
  .get(errorCatch(controller.getSaveOrder));

module.exports = router;
