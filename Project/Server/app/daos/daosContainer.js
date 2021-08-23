// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const MysqlDAOFake = require("./MysqlDAOFake");
const MysqlDAO = require("./MysqlDAO");
const ThuongHieuDAO = require("./ThuongHieuDAO");

module.exports = {
  DAO: MysqlDAO, // Xài mysql
  ThuongHieuDAO,
  // DAO: MysqlConnectionFake, // Xài mysql fake
};
