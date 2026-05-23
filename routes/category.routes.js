import Router from "express";
import categoryController from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.get("/all", authMiddleware, categoryController.getCategories);
router.post("/new", authMiddleware, categoryController.createCategory);
router.put("/update/:categoryId", authMiddleware, categoryController.updateCategory);
router.delete("/delete/:categoryId", authMiddleware, categoryController.deleteCategory);

export default router;
