// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controllers

const AuthenticationController = require("./authentication_controllers/AuthenticationController");

const ProductsController = require("./products_controllers/ProductsController");

const PayPalPaymentController = require("./payments_controllers/paypal_payments_controllers/PayPalPaymentController");
const StripePaymentController = require("./payments_controllers/stripe_payments_controllers/StripePaymentController");
const ZaloPayPaymentController = require("./payments_controllers/zalopay_payments_controllers/ZaloPayPaymentController");

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
