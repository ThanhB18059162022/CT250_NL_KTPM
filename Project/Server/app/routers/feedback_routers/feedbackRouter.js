const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gán các endpoints vào ModeratorsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực - truy cập dữ liệu
const {
  FeedbackValidator,
  AuthenticationValidator,
} = require("../../validators/validatorsContainer");
const { DAO, FeedbackDAO } = require("../../daos/daosContainer");
const {
  FeedbackProcessor,
  AuthenticationProcessor,
} = require("../../processors/processorsContainer");
const { JwtService } = require("../../services/servicesContainer");
const {
  FeedbackController,
  AuthenticationController,
} = require("../../controllers/controllersContainer");

const authController = new AuthenticationController(getAuthProc(), config);
const controller = new FeedbackController(getProc(), config);

router
  .route("/")
  // /moderators?page=1&limit=10
  .get(authController.authenticate, errorCatch(controller.getFeedback));

router
  .route("/:fb_no")
  .delete(authController.authenticate, errorCatch(controller.deleteFeedback));

router
  .route("/:fb_no/replies/")
  .post(authController.authenticate, errorCatch(controller.addReply));

router
  .route("/:fb_no/replies/:rep_no")
  .delete(authController.authenticate, errorCatch(controller.deleteReply));

module.exports = router;

//#region  EX

function getAuthProc() {
  const validator = new AuthenticationValidator();
  const jwt = new JwtService(config.jwt.secretKey);
  return new AuthenticationProcessor(validator, jwt);
}

function getProc() {
  const validator = new FeedbackValidator();
  const sqldao = new DAO(config.dbConnection.mysql);
  const dao = new FeedbackDAO(sqldao);
  return new FeedbackProcessor(validator, dao);
}

//#endregion
