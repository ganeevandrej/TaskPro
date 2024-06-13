import Router from "express";
import notificationController from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.post("/register", notificationController.registerToken);

export default router;