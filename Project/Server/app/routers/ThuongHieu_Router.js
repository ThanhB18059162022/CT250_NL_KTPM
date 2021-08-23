import { Router } from "express";
const router = Router();

import { CacThuongHieuController } from "../controllers/controllersContainer.js";
let controller = new CacThuongHieuController();

router.route("/").get(controller.layDanhSach).post(controller.them);

router
  .route("/:ma")
  .get(controller.layTheoMa)
  .put(controller.sua)
  .delete(controller.xoa);

export default router;
