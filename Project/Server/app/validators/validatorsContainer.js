// Facade Lớp lưu export
// Sẽ require thông qua lớp này

// Validators

const AuthenticationValidator = require("./authentication_validators/AuthenticationValidator");

const FeedbackValidator = require("./feedback_validators/FeedbackValidator");

const ModeratorsValidator = require("./moderators_validators/ModeratorsValidator");

const PaymentsValidator = require("./payments_validators/PaymentValidator");

const ProductsValidator = require("./products_validators/ProductsValidator");

module.exports = {
  AuthenticationValidator,
  FeedbackValidator,
  ModeratorsValidator,
  PaymentsValidator,
  ProductsValidator,
};
