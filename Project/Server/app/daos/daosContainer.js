// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const MysqlDAOFake = require("./MysqlDAOFake");
const MysqlDAO = require("./MysqlDAO");
const ProductDAO_Ram = require("./products_daos/ProductsDAO_Ram");
module.exports = {
  DAO: MysqlDAO, // Xài mysql
  ProductsDAO: ProductDAO_Ram,
  // DAO: MysqlConnectionFake, // Xài mysql fake
};
