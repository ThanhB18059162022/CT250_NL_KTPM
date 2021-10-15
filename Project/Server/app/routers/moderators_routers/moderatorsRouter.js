//#region Require

const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gán các endpoints vào ModeratorsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực - truy cập dữ liệu
const {
  ModeratorsValidator,
  AuthenticationValidator,
} = require("../../validators/validatorsContainer");
const { DAO, ModeratorsDAO } = require("../../daos/daosContainer");
const {
  ModeratorsProcessor,
  AuthenticationProcessor,
} = require("../../processors/processorsContainer");
const {
  ModeratorsController,
  AuthenticationController,
} = require("../../controllers/controllersContainer");

//#endregion

const authController = new AuthenticationController(getAuthProc(), config);

const controller = new ModeratorsController(getModProc(), config);

//#region Router

router
  .route("/")
  // /moderators?page=1&limit=10
  .get(errorCatch(controller.getModerators))
  .post(
    authController.authorize(["admin"]),
    errorCatch(controller.addModerator)
  );

// moderators/1
router
  .route("/:mod_no")
  .get(errorCatch(controller.getModeratorByNo))
  .put(
    authController.authorize(["admin"]),
    errorCatch(controller.updateModerator)
  )
  .delete(
    authController.authorize(["admin"]),
    errorCatch(controller.lockModerator)
  );

// moderators/PhoneNumber/1234567899
router
  .route("/PhoneNumber/:mod_phoneNumber")
  .get(errorCatch(controller.getModeratorByPhoneNumber));

router
  .route("/Mod_Id/:mod_id")
  .get(errorCatch(controller.getModeratorByMod_Id));

router
  .route("/Username/:mod_username")
  .get(errorCatch(controller.getModeratorByUsername));

//#endregion

module.exports = router;

//#region EX

function getAuthProc() {
  const validator = new AuthenticationValidator();

  return new AuthenticationProcessor(validator);
}

function getModProc() {
  const validator = new ModeratorsValidator();
  const sqldao = new DAO(config.dbConnection.mysql);
  const dao = new ModeratorsDAO(sqldao);

  return new ModeratorsProcessor(validator, dao);
}

//#endregion
