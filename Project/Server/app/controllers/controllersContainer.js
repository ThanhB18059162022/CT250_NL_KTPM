// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controller
const AuthenticationController = require("./authentication_controllers/AuthenticationController");
const AuthenticationValidator = require("./authentication_controllers/AuthenticationValidator");

const NotesController = require("./notes_controllers/NotesController");

const ProductsController = require("./products_controllers/ProductsController");
const ProductsValidator = require("./products_controllers/ProductsValidator");

module.exports = {
  AuthenticationController,
  AuthenticationValidator,

  NotesController,

  ProductsController,
  ProductsValidator,
};
