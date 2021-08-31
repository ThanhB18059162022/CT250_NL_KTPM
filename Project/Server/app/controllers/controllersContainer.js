// Facade Lớp lưu export
// Sẽ require thông qua lớp này

//Controller
const AuthenticationController = require("./AuthenticationController");
const NotesController = require("./NotesController");
const ProductsController = require("./products_controllers/ProductsController");
const ProductsValidator = require("./products_controllers/ProductsValidator");

module.exports = {
  AuthenticationController: AuthenticationController,
  NotesController: NotesController,
  ProductsController: ProductsController,
  ProductsValidator: ProductsValidator,
};
