// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const AuthenticationProcessor = require("./authentication_processors/AuthenticationProcessor");

const ProductsProcessor = require("./products_processors/ProductsProcessor");

// Payments
const PayPalPaymentProcessor = require("./payments_processors/paypal_payment_processors/PayPalPaymentProcessor");
const StripePaymentProcessor = require("./payments_processors/stripe_payment_processors/StripePaymentProcessor");
const ZaloPayPaymentProcessor = require("./payments_processors/zalo_payment_processors/ZaloPayPaymentProcessor");
const DefaultPaymentProcessor = require("./payments_processors/default_payment_processors/DefaultPaymentProcessor");

const ModeratorsProcessor = require("./moderators_processors/ModeratorsProcessor");

const FeedbackProcessor = require("./feedback_processors/FeedbackProcessor");

module.exports = {
  AuthenticationProcessor,

  ProductsProcessor,

  PayPalPaymentProcessor,
  StripePaymentProcessor,
  ZaloPayPaymentProcessor,
  DefaultPaymentProcessor,

  ModeratorsProcessor,

  FeedbackProcessor,
};
