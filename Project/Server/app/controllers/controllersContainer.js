// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controllers

const AuthenticationController = require("./authentication_controllers/AuthenticationController");

const ProductsController = require("./products_controllers/ProductsController");

const PayPalPaymentController = require("./payments_controller/paypal_payments/PayPalPaymentController");
const StripePaymentController = require("./payments_controller/stripe_payments/StripePaymentController");
const ZaloPayPaymentController = require("./payments_controller/zalopay_payments/ZaloPayPaymentController");

const ModeratorsController = require("./moderators_controllers/ModeratorsController");

const FeedbackController = require("./feedback_controllers/FeedbackController");

module.exports = {
  AuthenticationController,

  ProductsController,

  PayPalPaymentController,
  StripePaymentController,
  ZaloPayPaymentController,

  ModeratorsController,

  FeedbackController,
};
