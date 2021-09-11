// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controller
const JwtService = require("./authentication_controllers/JwtService");
const AuthenticationController = require("./authentication_controllers/AuthenticationController");
const AuthenticationValidator = require("./authentication_controllers/AuthenticationValidator");

const NotesController = require("./notes_controllers/NotesController");

const ProductsController = require("./products_controllers/ProductsController");
const ProductsValidator = require("./products_controllers/ProductsValidator");

const PayPalPaymentController = require("./payments_controller/PayPalPaymentController");
const PayPalService = require("./payments_controller/PayPalService");
const PayPalOrderService = require("./payments_controller/PayPalOrderService");

const ModeratorsController = require("./moderators_controllers/ModeratorsControllers");
const ModeratorsValidator = require("./moderators_controllers/ModeratorsValidator");

module.exports = {
  JwtService,
  AuthenticationController,
  AuthenticationValidator,

  NotesController,

  ProductsController,
  ProductsValidator,

  PayPalPaymentController,
  PayPalService,
  PayPalOrderService,

  ModeratorsController,
  ModeratorsValidator,
};
