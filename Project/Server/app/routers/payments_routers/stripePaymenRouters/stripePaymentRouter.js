const express = require("express");
const router = express.Router();
const { payment } = require("../../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../../routerErrorHandler");

const {
  StripePaymentController,
  StripeService,
  PaymentValidator,
} = require("../../../controllers/controllersContainer");

const { CustomersOrdersDAO } = require("../../../daos/daosContainer");

//#region  INIT

const dao = new CustomersOrdersDAO();
const service = new StripeService(payment.stripe);
const validator = new PaymentValidator();
const controller = new StripePaymentController(validator, service, dao);

//#endregion

router.route("/createOrder").post(errorCatch(controller.createOrder));

router.route("/checkoutOrder/:id").get(errorCatch(controller.checkoutOrder));

module.exports = router;
