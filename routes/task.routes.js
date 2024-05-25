import Router from "express";
import taskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.get("/all", authMiddleware, taskController.getTasks);
router.post("/new", authMiddleware, taskController.createTask);
router.put("/:taskId/:categoryId/complete", authMiddleware, taskController.completeTask);
router.put("/:taskId/update", authMiddleware, taskController.updateTask);
router.delete("/:taskId/delete", authMiddleware, taskController.deleteTask);
router.get("/priorities/all", authMiddleware, taskController.getPriorities);

export default router;
