const express = require("express");
const router = express.Router();
const config = require("../../config");

const {
  PayPalPaymentController,
  PayPalSerivce,
  PayPalOrderService,
} = require("../../controllers/controllersContainer");

const dao = new AuthenticationDAO();
const validator = new AuthenticationValidator();

const controller = new AuthenticationController(validator, jwt, dao);

// Bắc buộc đăng nhập
router
  .route("/getUser")
  .get(
    controller.authenticate,
    controller.authorize(["admin", "emp"]),
    controller.getLoginUser
  );

router.route("/login").post(controller.login);

module.exports = router;
const exist = await this.dao.allProductsExist(products);
