import userService from "../service/user-service.js";

class UserController {
  async getAvatar(req, res, next) {
    try {
      const userId = req.params.userId;
      const imageUrl = await userService.getAvatar(userId);

      return res.send(imageUrl);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const body = req.body;
      const task = await userService.createTask(body);

      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const body = req.body;
      const taskId = req.params.taskId;
      const task = await userService.updateTask(body, taskId);

      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const userId = req.params.userId;
      const tasks = await userService.getTasks(userId);

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      await userService.deleteTask(taskId);

      return res.send("Вы успешно удалили задачу!");
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const userId = req.params.userId;
      const categories = await userService.getCategories(userId);

      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const body = req.body;
      const category = await userService.createCategory(body);

      console.log(category);

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const newNameCategory = req.body;
      const category = await userService.updateCategory(categoryId, newNameCategory);

      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      await userService.deleteCategory(categoryId);

      return res.send("Вы усспешно удалили категорию!");
    } catch (error) {
      next(error);
    }
  }

  async getPriorities(req, res, next) {
    try {
      const priorities = await userService.getPriorities();

      return res.json(priorities);
    } catch (error) {
      next(error);
    }
  }

  async completeTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      await userService.completeTask(taskId);

      return res.json("Вы успешно завершили задачу!");
    } catch (error) {
      next(error);
    }
  }

  async updateUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const data = req.body;

      const user = await userService.updateUserInfo(data, userId);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
