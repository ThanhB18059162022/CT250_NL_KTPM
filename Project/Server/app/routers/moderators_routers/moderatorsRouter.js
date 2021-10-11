const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gán các endpoints vào ModeratorsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực - truy cập dữ liệu
const { ModeratorsValidator } = require("../../validators/validatorsContainer");
const { ModeratorConverter } = require("../../services/servicesContainer");
const { DAO, ModeratorsDAO } = require("../../daos/daosContainer");
const { ModeratorsProcessor } = require("../../processors/processorsContainer");
const {
  ModeratorsController,
} = require("../../controllers/controllersContainer");

const validator = new ModeratorsValidator();
const sqldao = new DAO(config.dbConnection.mysql);
const converter = new ModeratorConverter();
const dao = new ModeratorsDAO(sqldao, converter);
const processor = new ModeratorsProcessor(validator, dao);
const controller = new ModeratorsController(processor, config);

router
  .route("/")
  // /moderators?page=1&limit=10
  .get(errorCatch(controller.getModerators))
  .post(errorCatch(controller.addModerator));

// moderators/1
router
  .route("/:mod_no")
  .get(errorCatch(controller.getModeratorByNo))
  .put(errorCatch(controller.updateModerator));

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

module.exports = router;
