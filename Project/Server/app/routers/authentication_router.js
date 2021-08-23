import { Router } from "express";
const router = Router();

import { AuthenticationController } from "../controllers/controllersContainer.js";
const controller = new AuthenticationController();

router.route("/login").get(controller.login);

export default router;
