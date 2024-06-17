import Router from "express";
import techniquesController from "../controllers/techniques.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.get("/tasks/:userId", techniquesController.getTask);
router.get("/tasks/all/:userId", authMiddleware, techniquesController.getTasks);
router.post("/tasks/create", authMiddleware, techniquesController.createTask);
router.put("/tasks/update/:taskId", authMiddleware, techniquesController.updateTask);
router.put("/tasks/complete/:taskId", authMiddleware, techniquesController.completedTask);
router.delete("/tasks/delete/:taskId", authMiddleware, techniquesController.deleteTask);


export default router;