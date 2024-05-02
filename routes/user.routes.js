import Router from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.post("/upload/avatar", authMiddleware, userController.setUserAvatar);

export default router;

