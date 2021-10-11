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
  PayPalService,
  CurrencyExchangeService,
  StorageService,
} = require("../../../services/servicesContainer");
const { DAO, PaymentsDAO } = require("../../../daos/daosContainer");
const {
  PayPalPaymentProcessor,
} = require("../../../processors/processorsContainer");
const {
  PayPalPaymentController,
} = require("../../../controllers/controllersContainer");

//#region  INIT

const sqldao = new DAO(config.dbConnection.mysql);
const dao = new PaymentsDAO(sqldao);
const { payment } = config;
const service = new PayPalService(payment.paypal);
const validator = new PaymentsValidator();
const exService = new CurrencyExchangeService(payment.currency);
const storeService = new StorageService();
const processor = new PayPalPaymentProcessor(
  validator,
  dao,
  exService,
  service,
  storeService
);
const controller = new PayPalPaymentController(processor, config);

//#endregion

router.route("/clientId").get(errorCatch(controller.getClientId));

router.route("/createOrder").post(errorCatch(controller.createOrder));

// Thanh toán order
router.route("/captureOrder/:id").get(errorCatch(controller.captureOrder));

// Lấy ra order đã thanh toán
router.route("/getSaveOrder/:id").get(errorCatch(controller.getSaveOrder));

module.exports = router;
