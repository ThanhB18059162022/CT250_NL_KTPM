const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gán các endpoints vào ProductsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực dữ liệu
const { ProductsValidator } = require("../../validators/validatorsContainer");
const { ImageService } = require("../../services/servicesContainer");
const { ProductsDAO } = require("../../daos/daosContainer");
const { ProductsProcessor } = require("../../processors/processorsContainer");
const {
  ProductsController,
} = require("../../controllers/controllersContainer");

const imgService = new ImageService(config.baseImgUri);
const dao = new ProductsDAO(imgService);
const validator = new ProductsValidator();
const processor = new ProductsProcessor(validator, dao);
const controller = new ProductsController(processor, config);

router
  .route("/")
  // /products?page=1&limit=24
  .get(errorCatch(controller.getProducts))
  // /products
  .post(errorCatch(controller.addProduct));

router
  .route("/price")
  // /products/price?min=0&max=100&page=1&limit=24
  .get(errorCatch(controller.getProductsByPrice));

// products/1
router
  .route("/:prod_no")
  .get(errorCatch(controller.getProductByNo))
  .put(errorCatch(controller.updateProduct))
  .delete(errorCatch(controller.deleteProduct));

// products/name/iPhone12
router.route("/Name/:prod_name").get(errorCatch(controller.getProductByName));

module.exports = router;
