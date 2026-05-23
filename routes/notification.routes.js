import Router from "express";
import notificationController from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.post("/register", authMiddleware, notificationController.registerToken);
router.post("/send", authMiddleware, notificationController.sendNotification);
router.get("/read/:userId", authMiddleware, notificationController.readNotifications);
router.get("/:userId", authMiddleware, notificationController.getNotifications);
router.delete("/delete/:taskId", authMiddleware, notificationController.deleteNotification);

export default router;