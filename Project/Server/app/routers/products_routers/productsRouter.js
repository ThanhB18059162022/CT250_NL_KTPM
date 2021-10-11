const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gán các endpoints vào ProductsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực dữ liệu
const { ProductsValidator } = require("../../validators/validatorsContainer");
const {
  ImageService,
  ProductConverterService,
} = require("../../services/servicesContainer");
const { DAO, ProductsDAO } = require("../../daos/daosContainer");
const { ProductsProcessor } = require("../../processors/processorsContainer");
const {
  ProductsController,
} = require("../../controllers/controllersContainer");

const sqldao = new DAO(config.dbConnection.mysql);
const converter = new ProductConverterService();
const dao = new ProductsDAO(sqldao, converter);
const validator = new ProductsValidator();
const imgService = new ImageService(config.baseImgUri);
const processor = new ProductsProcessor(validator, dao, imgService);
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

// products/1/details/
router
  .route("/:prod_no/details")
  .post(errorCatch(controller.addProductDetails));

module.exports = router;
