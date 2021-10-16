// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const MysqlDAO = require("./MysqlDAO");

const ProductsDAO = require("./products_daos/ProductsDAO");
const ProductDAO_Ram = require("./products_daos/ProductsDAO_Ram");

const PaymentsDAO = require("./payments_daos/PaymentsDAO");
const PaymentsDAO_Ram = require("./payments_daos/PaymentsDAO_Ram");

const ModeratorsDAO = require("./moderators_daos/ModeratorsDAO");
const ModeratorsDAO_Ram = require("./moderators_daos/ModeratorsDAO_Ram");

const FeedbackDAO = require("./feedback_daos/FeedbackDAO");
const FeedbackDAO_Ram = require("./feedback_daos/FeedbackDAO_Ram");

module.exports = {
  DAO: MysqlDAO, // Xài mysql

  ProductsDAO,

  PaymentsDAO,
  // PaymentsDAO: PaymentsDAO_Ram,

  ModeratorsDAO,

  FeedbackDAO,
};
