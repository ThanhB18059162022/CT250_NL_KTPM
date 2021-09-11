const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

const {
  PayPalPaymentController,
  PayPalService,
  PayPalOrderService,
} = require("../../controllers/controllersContainer");

const payPalService = new PayPalService(config.paypal);
const orderService = new PayPalOrderService(null, config.paypal.currency_code);

const controller = new PayPalPaymentController(payPalService, orderService);

// Bắc buộc đăng nhập
router.route("/clientId").get(errorCatch(controller.getClientId));

router.route("/createOrder").post(errorCatch(controller.createOrder));

router.route("/captureOrder/:id").get(errorCatch(controller.captureOrder));

module.exports = router;
