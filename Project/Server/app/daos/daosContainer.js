// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const MysqlDAO = require("./MysqlDAO");

const AuthenticationDAO_Ram = require("./authentication_daos/AuthenticationDAO_Ram");

const ProductsDAO = require("./products_daos/ProductsDAO");
// const ProductDAO_Ram = require("./products_daos/ProductsDAO_Ram");

const CustomersOrdersDAO = require("./customers_orders_daos/CustomersOrdersDAO");
// const CustomersOrdersDAO_Ram = require("./customers_orders_daos/CustomersOrdersDAO_Ram");

const ModeratorsDAO = require("./moderators_daos/ModeratorDAO");
// const ModeratorsDAO_Ram = require("./moderators_daos/ModeratorsDAO_Ram");

const FeedbackDAO_Ram = require("./feedback_daos/FeedbackDAO_Ram");

module.exports = {
  DAO: MysqlDAO, // Xài mysql

  AuthenticationDAO: AuthenticationDAO_Ram,

  ProductsDAO,

  CustomersOrdersDAO,

  ModeratorsDAO,

  FeedbackDAO: FeedbackDAO_Ram,
};
