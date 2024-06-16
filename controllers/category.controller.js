import categoryService from "../service/category-service.js";

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const userId = req.query.userId;
      const categories = await categoryService.getCategories(userId);

      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const body = req.body;
      const category = await categoryService.createCategory(body);

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const {nameCategory} = req.body;
      const category = await categoryService.updateCategory(categoryId, nameCategory);

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      await categoryService.deleteCategory(categoryId);

      return res.send("Вы усспешно удалили категорию!");
    } catch (error) {
      next(error);
    }
  }

  async getPriorities(req, res, next) {
    try {
      const priorities = await categoryService.getPriorities();

      return res.json(priorities);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
