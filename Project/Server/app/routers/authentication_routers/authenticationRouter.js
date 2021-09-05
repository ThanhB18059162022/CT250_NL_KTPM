const express = require("express");
const router = express.Router();

// const { AuthenticationDAO } = require("../../daos/daosContainer");
const JwtService = require("./JwtService");

const {
  AuthenticationController,
  AuthenticationValidator,
} = require("../../controllers/controllersContainer");

const dao = null;
const validator = new AuthenticationValidator();
const jwt = new JwtService();

const controller = new AuthenticationController(dao, validator, jwt);

router.route("/login").get(controller.login);


module.exports = router;
