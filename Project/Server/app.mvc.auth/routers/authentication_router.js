const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/AuthenticationController");
let controller = new AuthenticationController();

router.route("/login").post(controller.login);
router.route("/loginAsync").post(controller.loginAsync);

module.exports = router;