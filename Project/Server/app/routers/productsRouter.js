const express = require("express");
const router = express.Router();

const {
  ProductsController,
  ProductsValidator,
} = require("../controllers/controllersContainer");

const { ProductsDAO } = require("../daos/daosContainer");

const dao = new ProductsDAO();
const validator = new ProductsValidator();
const controller = new ProductsController(dao, validator);

router.route("/").get(controller.getProducts).post(controller.addProduct);

router
  .route("/:pro_no")
  .get(controller.getProductByNo)
  .put(controller.updateProduct)
  .delete(controller.deleteProduct);

router.route("/name/:pro_name").get(controller.getProductByName);

module.exports = router;
