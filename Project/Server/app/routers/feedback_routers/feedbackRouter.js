const express = require("express");
const router = express.Router();

// Router gán các endpoints vào ModeratorsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực - truy cập dữ liệu
const { FeedbackValidator } = require("../../validators/validatorsContainer");
const { FeedbackDAO } = require("../../daos/daosContainer");
const { FeedbackProcessor } = require("../../processors/processorsContainer");
const {
  FeedbackController,
} = require("../../controllers/controllersContainer");

const validator = new FeedbackValidator();
const dao = new FeedbackDAO();
const processor = new FeedbackProcessor(validator, dao);
const controller = new FeedbackController(processor);

router
  .route("/")
  // /moderators?page=1&limit=10
  .get(errorCatch(controller.getFeedback))
  .post(errorCatch(controller.addFeedback));

module.exports = router;
