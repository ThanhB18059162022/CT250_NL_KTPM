// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const ProductsProcessor = require("./products_processors/ProductsProcessor");

const ModeratorsProcessor = require("./moderators_processors/ModeratorsProcessor");

const FeedbackProcessor = require("./feedback_processors/FeedbackProcessor");

module.exports = {
  ProductsProcessor,

  ModeratorsProcessor,

  FeedbackProcessor,
};
