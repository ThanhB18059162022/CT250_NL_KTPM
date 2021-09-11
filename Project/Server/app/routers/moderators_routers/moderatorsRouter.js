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
  // /products?page=1&limit=10
  .get(errorCatch(controller.getModerators));

// products/1
router.route("/:mod_no").get(errorCatch(controller.getModeratorByNo));

// products/name/iPhone12
router
  .route("/PhoneNumber/:mod_phoneNumber")
  .get(errorCatch(controller.getModeratorByPhoneNumber));

module.exports = router;
