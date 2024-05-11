import Router from "express";
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.get("/avatar/:userId", authMiddleware, userController.getAvatar);
router.get("/:userId/tasks/all", authMiddleware, userController.getTasks);
router.delete("/tasks/:taskId/delete", authMiddleware, userController.deleteTask);
router.get("/:userId/categories/all", authMiddleware, userController.getCategories);
router.get("/priorities/all", authMiddleware, userController.getPriorities);
router.post("/tasks/new", authMiddleware, userController.createTask);
router.put("/tasks/:taskId/complete", authMiddleware, userController.completeTask);
router.put("/tasks/:taskId/update", userController.updateTask);
router.put("/:userId/update", authMiddleware, userController.updateUserInfo);

export default router;