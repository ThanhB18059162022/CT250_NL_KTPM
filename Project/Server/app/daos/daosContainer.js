// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const MysqlDAO = require("./MysqlDAO");

const ProductsDAO = require("./products_daos/ProductsDAO");

const PaymentsDAO = require("./payments_daos/PaymentsDAO");

const ModeratorsDAO = require("./moderators_daos/ModeratorsDAO");

const FeedbackDAO = require("./feedback_daos/FeedbackDAO");

module.exports = {
  DAO: MysqlDAO, // Xài mysql

  ProductsDAO,

  PaymentsDAO,

  ModeratorsDAO,

  FeedbackDAO,
};
