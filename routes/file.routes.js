import Router from "express";
import fileController from "../controllers/file.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import multer from "multer";

const router = new Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/avatar/:userId", [authMiddleware, upload.single("image")], fileController.uploadAvatar);
router.delete("/avatar/:userId", authMiddleware, fileController.deleteAvatar);

export default router;

