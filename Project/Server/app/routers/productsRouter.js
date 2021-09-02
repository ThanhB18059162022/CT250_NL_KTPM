const express = require("express");
const router = express.Router();

// Router gán các endpoints vào ProductsController

// Bắt lỗi server
const { errorCatch } = require("./routerErrorHandler");

// Controller và lớp xác thực dữ liệu
const {
  ProductsController,
  ProductsValidator,
} = require("../controllers/controllersContainer");

// Lớp truy cập CSDL
const { ProductsDAO } = require("../daos/daosContainer");

const dao = new ProductsDAO();
const validator = new ProductsValidator();
const controller = new ProductsController(dao, validator);

// products/
router
  .route("/")
  .get(errorCatch(controller.getProducts))
  .post(errorCatch(controller.addProduct));

// products/pro_no
router
  .route("/:pro_no")
  .get(errorCatch(controller.getProductByNo))
  .put(errorCatch(controller.updateProduct))
  .delete(errorCatch(controller.deleteProduct));

// products/name/pro_name
router.route("/name/:pro_name").get(errorCatch(controller.getProductByName));

module.exports = router;
