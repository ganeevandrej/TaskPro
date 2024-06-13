import Router from "express";
import taskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.get("/all/:userId", taskController.getTasks);
router.post("/new", authMiddleware, taskController.createTask);
router.put("/complete/:taskId", authMiddleware, taskController.completeTask);
router.put("/update/:taskId", authMiddleware, taskController.updateTask);
router.delete("/delete/:taskId", authMiddleware, taskController.deleteTask);
router.get("/priorities/all", authMiddleware, taskController.getPriorities);

export default router;
