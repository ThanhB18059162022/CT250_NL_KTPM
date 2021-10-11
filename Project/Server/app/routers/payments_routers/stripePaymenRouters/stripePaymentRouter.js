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
  StripeService,
  CurrencyExchangeService,
  StorageService,
} = require("../../../services/servicesContainer");
const { DAO, PaymentsDAO } = require("../../../daos/daosContainer");
const {
  StripePaymentProcessor,
} = require("../../../processors/processorsContainer");
const {
  StripePaymentController,
} = require("../../../controllers/controllersContainer");

//#region  INIT

const sqldao = new DAO(config.dbConnection.mysql);
const dao = new PaymentsDAO(sqldao);
const { payment } = config;
const service = new StripeService(payment.stripe);
const validator = new PaymentsValidator();
const exService = new CurrencyExchangeService(payment.currency);
const storeService = new StorageService();
const processor = new StripePaymentProcessor(
  validator,
  dao,
  exService,
  service,
  storeService
);
const controller = new StripePaymentController(processor, config);

//#endregion

router.route("/createOrder").post(errorCatch(controller.createOrder));

// Thanh toán
router.route("/checkoutOrder/:id").get(errorCatch(controller.checkoutOrder));

// Lấy đơn hàng đã thanh toán
router.route("/getSaveOrder/:id").get(errorCatch(controller.getSaveOrder));

module.exports = router;
