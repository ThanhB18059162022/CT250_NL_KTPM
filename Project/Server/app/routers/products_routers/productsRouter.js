const express = require("express");
const router = express.Router();

// Router gán các endpoints vào ProductsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực dữ liệu
const {
  ProductsController,
  ProductsValidator,
} = require("../../controllers/controllersContainer");

// Lớp truy cập CSDL
const { ProductsDAO } = require("../../daos/daosContainer");

const dao = new ProductsDAO();
const validator = new ProductsValidator();
const controller = new ProductsController(validator, dao);

router
  .route("/")
  // /products?page=1&limit=24
  .get(errorCatch(controller.getProducts))
  // /products
  .post(errorCatch(controller.addProduct));

// products/1
router
  .route("/:prod_no")
  .get(errorCatch(controller.getProductByNo))
  .put(errorCatch(controller.updateProduct))
  .delete(errorCatch(controller.deleteProduct));

// products/name/iPhone12
router.route("/name/:prod_name").get(errorCatch(controller.getProductByName));

module.exports = router;
