const express = require("express");
const router = express.Router();

// Router gán các endpoints vào ModeratorsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực dữ liệu
const {
  ModeratorsController,
  ModeratorsValidator,
} = require("../../controllers/controllersContainer");

// Lớp truy cập CSDL
const { ModeratorsDAO } = require("../../daos/daosContainer");

const dao = new ModeratorsDAO();
const validator = new ModeratorsValidator();
const controller = new ModeratorsController(validator, dao);

router
  .route("/")
  // /moderators?page=1&limit=10
  .get(errorCatch(controller.getModerators))
  .post(errorCatch(controller.addModerator));

// moderators/1
router
  .route("/:mod_no")
  .get(errorCatch(controller.getModeratorByNo))
  .put(errorCatch(controller.updateModerator))
  .delete(errorCatch(controller.lockModerator));

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
