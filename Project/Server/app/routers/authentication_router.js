const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/AuthenticationController");
const controller = new AuthenticationController();

router.route("/login").get(controller.login);

module.exports = router;
