//#region Require

const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

const {
  PaymentsValidator,
  AuthenticationValidator,
} = require("../../validators/validatorsContainer");
const {
  PayPalService,
  StripeService,
  CurrencyExchangeService,
  StorageService,
  ApiCaller,
  ZaloPayService,
  JwtService,
} = require("../../services/servicesContainer");
const { DAO, PaymentsDAO } = require("../../daos/daosContainer");
const {
  DefaultPaymentProcessor,
  PayPalPaymentProcessor,
  StripePaymentProcessor,
  ZaloPayPaymentProcessor,
  AuthenticationProcessor,
} = require("../../processors/processorsContainer");
const {
  DefaultPaymentController,
  PayPalPaymentController,
  StripePaymentController,
  ZaloPayPaymentController,
  AuthenticationController,
} = require("../../controllers/controllersContainer");

//#endregion

//#region Default

const authController = new AuthenticationController(getAuthProc(), config);

const defaultController = new DefaultPaymentController(
  getDefaultProc(),
  config
);

router
  .route("/default/createOrder")
  .post(errorCatch(defaultController.createOrder));

// Thanh toán  - login
router
  .route("/default/checkoutOrder/:id")
  .get(
    authController.authenticate,
    errorCatch(defaultController.checkoutOrder)
  );

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

//#region StoreOrders
// Lấy ra order lưu tạm - Phải login

router
  .route("/StoreOrders/")
  .get(
    authController.authenticate,
    errorCatch(payPalcontroller.getStoreOrders)
  );

// Xóa order lưu tạm - Admin
router
  .route("/StoreOrders/:id")
  .delete(
    authController.authenticate,
    authController.authorize(["admin"]),
    errorCatch(payPalcontroller.deleteStoreOrder)
  );

//#endregion

// Lấy ra order đã thanh toán
router
  .route("/getSaveOrder/:id")
  .get(errorCatch(payPalcontroller.getSaveOrder));

module.exports = router;

//#region EX

function getDefaultProc() {
  const { validator, dao, exService, storeService } = getDI();

  return new DefaultPaymentProcessor(validator, dao, exService, storeService);
}

function getAuthProc() {
  const validator = new AuthenticationValidator();
  const jwt = new JwtService(config.jwt.secretKey);

  return new AuthenticationProcessor(validator, jwt);
}

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
  const storeService = new StorageService(config.dbConnection.redis);

  return { dao, validator, exService, storeService };
}

//#endregion
