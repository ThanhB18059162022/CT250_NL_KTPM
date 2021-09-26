// Facade Lớp lưu export
// Sẽ require thông qua lớp này

const ModeratorsProcessor = require("./moderators_processors/ModeratorsProcessor");

const FeedbackProcessor = require("./feedback_processors/FeedbackProcessor");

module.exports = {
  ModeratorsProcessor,

  FeedbackProcessor,
};
