const express = require("express");
const router = express.Router();
const config = require("../../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../../routerErrorHandler");

const {
  PayPalPaymentController,
  PayPalService,
  PaymentValidator,
} = require("../../../controllers/controllersContainer");

const { CustomersOrdersDAO } = require("../../../daos/daosContainer");

//#region  INIT

const dao = new CustomersOrdersDAO();
const payPalService = new PayPalService(config.paypal, dao);
const validator = new PaymentValidator();
const controller = new PayPalPaymentController(validator, payPalService);

//#endregion

// Bắt buộc đăng nhập
router.route("/clientId").get(errorCatch(controller.getClientId));

router.route("/createOrder").post(errorCatch(controller.createOrder));

router.route("/captureOrder/:orderID").get(errorCatch(controller.captureOrder));

module.exports = router;
