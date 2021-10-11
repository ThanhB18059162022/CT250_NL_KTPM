const express = require("express");
const router = express.Router();
const config = require("../../../config");

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
  StorageService,
} = require("../../../services/servicesContainer");
const { DAO, CustomersOrdersDAO } = require("../../../daos/daosContainer");
const {
  ZaloPayPaymentProcessor,
} = require("../../../processors/processorsContainer");
const {
  ZaloPayPaymentController,
} = require("../../../controllers/controllersContainer");

//#region  INIT

const sqldao = new DAO(config.dbConnection.mysql);
const dao = new CustomersOrdersDAO(sqldao);
const apiCaller = new ApiCaller();
const { payment } = config;
const service = new ZaloPayService(payment.zalo, apiCaller);
const validator = new PaymentsValidator();
const exService = new CurrencyExchangeService(payment.currency);
const storeService = new StorageService();
const processor = new ZaloPayPaymentProcessor(
  validator,
  dao,
  exService,
  service,
  storeService
);
const controller = new ZaloPayPaymentController(processor, config);

//#endregion

router.route("/createOrder").post(errorCatch(controller.createOrder));

// Thanh toán đơn hàng
router.route("/checkoutOrder/:id").get(errorCatch(controller.checkoutOrder));

// Lấy đơn hàng đã lưu
router.route("/getSaveOrder/:id").get(errorCatch(controller.getSaveOrder));

module.exports = router;
