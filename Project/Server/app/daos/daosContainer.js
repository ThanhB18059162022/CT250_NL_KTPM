// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const MysqlDAOFake = require("./MysqlDAOFake");
const MysqlDAO = require("./MysqlDAO");

const AuthenticationDAO_Ram = require("./authentication_daos/AuthenticationDAO_Ram");

const ProductDAO_Ram = require("./products_daos/ProductsDAO_Ram");

const CustomersOrdersDAO_Ram = require("./customers_orders_daos/CustomersOrdersDAO_Ram");

const ModeratorsDAO_Ram = require("./moderators_daos/ModeratorsDAO_Ram");

module.exports = {
  DAO: MysqlDAO, // Xài mysql

  AuthenticationDAO: AuthenticationDAO_Ram,

  ProductsDAO: ProductDAO_Ram,

  CustomersOrdersDAO: CustomersOrdersDAO_Ram,

  ModeratorsDAO: ModeratorsDAO_Ram,
};
