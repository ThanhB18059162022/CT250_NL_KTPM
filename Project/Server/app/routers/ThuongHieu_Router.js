const express = require("express");
const router = express.Router();

const {
  CacThuongHieuController,
} = require("../controllers/controllersContainer");
let controller = new CacThuongHieuController();

router.route("/").get(controller.layDanhSach).post(controller.them);

router
  .route("/:ma")
  .get(controller.layTheoMa)
  .put(controller.sua)
  .delete(controller.xoa);

module.exports = router;
