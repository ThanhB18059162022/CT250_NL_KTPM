import { Router } from "express";
const router = Router();

import { NotesController } from "../controllers/controllersContainer.js";
let controller = new NotesController();

router.route("/").get(controller.getList).post(controller.post);
router
  .route("/:id")
  .get(controller.getById)
  .put(controller.put)
  .delete(controller.delete);

export default router;
