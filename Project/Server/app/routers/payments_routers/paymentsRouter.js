const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gắn endpoints vào controller

//#region Require

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

const { PaymentsValidator } = require("../../validators/validatorsContainer");
const {
  PayPalService,
  StripeService,
  CurrencyExchangeService,
  StorageService,
  ApiCaller,
  ZaloPayService,
} = require("../../services/servicesContainer");
const { DAO, PaymentsDAO } = require("../../daos/daosContainer");
const {
  PayPalPaymentProcessor,
  StripePaymentProcessor,
  ZaloPayPaymentProcessor,
} = require("../../processors/processorsContainer");
const {
  PayPalPaymentController,
  StripePaymentController,
  ZaloPayPaymentController,
} = require("../../controllers/controllersContainer");

//#endregion

//#region  PayPal

const payPalcontroller = new PayPalPaymentController(getPayPalProc(), config);

router.route("/paypal/clientId").get(errorCatch(payPalcontroller.getClientId));

router
  .route("/paypal/createOrder")
  .post(errorCatch(payPalcontroller.createOrder));

// Thanh toán order
router
  .route("/paypal/captureOrder/:id")
  .get(errorCatch(payPalcontroller.captureOrder));

//#endregion

//#region Stripe

const stripeController = new StripePaymentController(getStripeProc(), config);

router
  .route("/stripe/createOrder")
  .post(errorCatch(stripeController.createOrder));

// Thanh toán
router
  .route("/stripe/checkoutOrder/:id")
  .get(errorCatch(stripeController.checkoutOrder));

//#endregion

//#region Zalo

const zaloController = new ZaloPayPaymentController(getZaloProc(), config);

router.route("/zalo/createOrder").post(errorCatch(zaloController.createOrder));

// Thanh toán đơn hàng
router
  .route("/zalo/checkoutOrder/:id")
  .get(errorCatch(zaloController.checkoutOrder));

//#endregion

// Lấy ra order đã thanh toán
router
  .route("/getSaveOrder/:id")
  .get(errorCatch(payPalcontroller.getSaveOrder));

module.exports = router;

//#region EX

function getPayPalProc() {
  const { validator, dao, exService, storeService } = getDI();
  const service = new PayPalService(config.payment.paypal);

  return new PayPalPaymentProcessor(
    validator,
    dao,
    exService,
    service,
    storeService
  );
}

function getStripeProc() {
  const { validator, dao, exService, storeService } = getDI();
  const service = new StripeService(config.payment.stripe);

  return new StripePaymentProcessor(
    validator,
    dao,
    exService,
    service,
    storeService
  );
}

function getZaloProc() {
  const { validator, dao, exService, storeService } = getDI();

  const apiCaller = new ApiCaller();
  const service = new ZaloPayService(config.payment.zalo, apiCaller);
  return new ZaloPayPaymentProcessor(
    validator,
    dao,
    exService,
    service,
    storeService
  );
}

function getDI() {
  const sqldao = new DAO(config.dbConnection.mysql);
  const dao = new PaymentsDAO(sqldao);
  const validator = new PaymentsValidator();
  const exService = new CurrencyExchangeService(config.payment.currency);
  const storeService = new StorageService();

  return { dao, validator, exService, storeService };
}

//#endregion
