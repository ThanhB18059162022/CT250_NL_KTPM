//#region Require

const express = require("express");
const router = express.Router();
const config = require("../../config");

// Router gán các endpoints vào ProductsController

// Bắt lỗi server
const { errorCatch } = require("../routerErrorHandler");

// Controller và lớp xác thực dữ liệu
const {
  ProductsValidator,
  AuthenticationValidator,
} = require("../../validators/validatorsContainer");
const {
  ImageService,
  JwtService,
} = require("../../services/servicesContainer");
const { DAO, ProductsDAO } = require("../../daos/daosContainer");
const {
  ProductsProcessor,
  AuthenticationProcessor,
} = require("../../processors/processorsContainer");
const {
  ProductsController,
  AuthenticationController,
} = require("../../controllers/controllersContainer");

//#endregion

const authController = new AuthenticationController(getAuthProc(), config);

const controller = new ProductsController(getProdProc(), config);

//#region Router

router
  .route("/")
  // /products?page=1&limit=24
  .get(errorCatch(controller.getProducts))
  // /products
  .post(
    authController.authenticate,
    authController.authorize(["admin"]),
    errorCatch(controller.addProduct)
  );

router
  .route("/price")
  // /products/price?min=0&max=100&page=1&limit=24
  .get(errorCatch(controller.getProductsByPrice));

// products/1
router
  .route("/:prod_no")
  .get(errorCatch(controller.getProductByNo))
  .put(
    authController.authenticate,
    authController.authorize(["admin"]),
    errorCatch(controller.updateProduct)
  );

// products/name/iPhone12
router.route("/Name/:prod_name").get(errorCatch(controller.getProductByName));

// products/1/details/
router
  .route("/:prod_no/details")
  .post(
    authController.authenticate,
    authController.authorize(["admin"]),
    errorCatch(controller.addProductDetails)
  );

//#endregion

module.exports = router;

//#region EX

function getAuthProc() {
  const validator = new AuthenticationValidator();
  const jwt = new JwtService(config.jwt.secretKey);

  return new AuthenticationProcessor(validator, jwt);
}

function getProdProc() {
  const sqldao = new DAO(config.dbConnection.mysql);
  const dao = new ProductsDAO(sqldao);
  const validator = new ProductsValidator();
  const imgService = new ImageService(config.baseImgUri);

  return new ProductsProcessor(validator, dao, imgService);
}

//#endregion
