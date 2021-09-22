const express = require("express");
const router = express.Router();

const {
  JwtService,
  AuthenticationValidator,
  AuthenticationController,
} = require("../../controllers/controllersContainer");

const config = require("../../config");

const jwt = new JwtService(config.secretKey);
const validator = new AuthenticationValidator();
const authController = new AuthenticationController(validator, jwt);

const { errorCatch } = require("../routerErrorHandler");

const { NotesController } = require("../../controllers/controllersContainer");

let controller = new NotesController();

router.route("/").get(errorCatch(controller.getList)).post(controller.post);
router.route("/ex").get(errorCatch(controller.getListEx));

router
  .route("/:id")
  .get(controller.getById)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;
