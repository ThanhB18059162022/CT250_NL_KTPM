const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gắn endpoints vào controller

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Jwt tạo key, controller và lớp xác thực dữ liệu
const {
  AuthenticationValidator,
} = require("../../validators/validatorsContainer");
const { AuthenticationDAO } = require("../../daos/daosContainer");
const { JwtService } = require("../../services/servicesContainer");
const {
  AuthenticationProcessor,
} = require("../../processors/processorsContainer");
const {
  AuthenticationController,
} = require("../../controllers/controllersContainer");

const validator = new AuthenticationValidator();
const {
  jwt: { secretKey },
} = config;
const jwt = new JwtService(secretKey);
const dao = new AuthenticationDAO();
const processor = new AuthenticationProcessor(validator, jwt, dao);
const controller = new AuthenticationController(processor, config);

// Bắc buộc đăng nhập
router
  .route("/getUser")
  .get(
    controller.authenticate,
    controller.authorize(["admin", "emp"]),
    errorCatch(controller.getLoginUser)
  );

router.route("/login").post(errorCatch(controller.login));

module.exports = router;
