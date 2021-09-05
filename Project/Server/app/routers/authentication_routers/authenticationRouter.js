const express = require("express");
const router = express.Router();

const { AuthenticationDAO } = require("../../daos/daosContainer");
const JwtService = require("./JwtService");

const {
  AuthenticationController,
  AuthenticationValidator,
} = require("../../controllers/controllersContainer");
const controller = new AuthenticationController(
  new AuthenticationDAO(),
  new AuthenticationValidator(),
  new JwtService()
);

router.route("/login").get(controller.login);

module.exports = router;
