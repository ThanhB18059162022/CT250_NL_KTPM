// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const ProductsProcessor = require("./products_processors/ProductsProcessor");

const StripePaymentProcessor = require("./payments_processors/stripe_payment_processors/StripePaymentProcessor");
const ZaloPayPaymentProcessor = require("./payments_processors/zalo_payment_processors/ZaloPayPaymentProcessor");

const ModeratorsProcessor = require("./moderators_processors/ModeratorsProcessor");

const FeedbackProcessor = require("./feedback_processors/FeedbackProcessor");

module.exports = {
  ProductsProcessor,

  StripePaymentProcessor,
  ZaloPayPaymentProcessor,

  ModeratorsProcessor,

  FeedbackProcessor,
};
