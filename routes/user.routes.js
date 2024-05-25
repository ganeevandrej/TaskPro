import Router from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.get("/avatar/:userId", authMiddleware, userController.getAvatar);
router.put("/:userId/update", authMiddleware, userController.updateUserInfo);

export default router;