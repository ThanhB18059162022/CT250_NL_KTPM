const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/PeopleController");
let controller = new PeopleController();

router.route("/").get(controller.getList);

module.exports = router;