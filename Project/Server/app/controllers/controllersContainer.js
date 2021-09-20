// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controller

//#region Authentication

const JwtService = require("./authentication_controllers/JwtService");
const AuthenticationController = require("./authentication_controllers/AuthenticationController");
const AuthenticationValidator = require("./authentication_controllers/AuthenticationValidator");

//#endregion

const NotesController = require("./notes_controllers/NotesController");

//#region Products

const ProductsController = require("./products_controllers/ProductsController");
const ProductsValidator = require("./products_controllers/ProductsValidator");

//#endregion

//#region Payment

const PayPalPaymentController = require("./payments_controller/paypal_payments/PayPalPaymentController");
const PayPalService = require("./payments_controller/paypal_payments/PayPalService");

const StripePaymentController = require("./payments_controller/stripe_payments/StripePaymentController");
const StripeService = require("./payments_controller/stripe_payments/StripeService");

const CurrencyExchangeService = require("./payments_controller/CurrencyExchangeService");
const PaymentValidator = require("./payments_controller/PaymentValidator");

//#endregion

//#region Moderators

const ModeratorsController = require("./moderators_controllers/ModeratorsControllers");
const ModeratorsValidator = require("./moderators_controllers/ModeratorsValidator");

//#endregion

module.exports = {
  JwtService,
  AuthenticationController,
  AuthenticationValidator,

  NotesController,

  ProductsController,
  ProductsValidator,

  PayPalPaymentController,
  PayPalService,
  StripePaymentController,
  StripeService,
  CurrencyExchangeService,
  PaymentValidator,

  ModeratorsController,
  ModeratorsValidator,
};
