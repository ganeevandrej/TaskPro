import taskService from "../service/task-service.js";

class TaskController {
  async getTasks(req, res, next) {
    try {
      const userId = req.body.userId;
      const tasks = await taskService.getTasks(userId);

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const body = req.body;
      const task = await taskService.createTask(body);

      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const body = req.body;
      const taskId = req.params.taskId;
      const task = await taskService.updateTask(body, taskId);

      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      await taskService.deleteTask(taskId);

      return res.send("Вы успешно удалили задачу!");
    } catch (error) {
      next(error);
    }
  }

  async completeTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      await taskService.completeTask(taskId);

      return res.json("Вы успешно завершили задачу!");
    } catch (error) {
      next(error);
    }
  }

  async getPriorities(req, res, next) {
    try {
      const priorities = await taskService.getPriorities();

      return res.json(priorities);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
