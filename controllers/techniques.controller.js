import technicuesService from "../service/techniques-service.js";

class TechniquesController {
  async createTask(req, res, next) {
    try {
      const body = req.body;
      const task = await technicuesService.createTask(body);

      return res.send(task);
    } catch (error) {
      next(error)
    }
  }
  async getTask(req, res, next) {
    try {
      const userId = req.params.userId;
      const params = req.query;
      const task = await technicuesService.getTask(userId, params.technique);

      return res.send(task);
    } catch (error) {
      next(error)
    }
  }
  async getTasks(req, res, next) {
    try {
      const userId = req.params.userId;
      const params = req.query;
      const tasks = await technicuesService.getTasks(userId, params.technique);
      console.log(tasks);

      return res.json(tasks);
    } catch (error) {
      next(error)
    }
  }
  async updateTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      const body = req.body;
      await technicuesService.updateTask(taskId, body);

      return res.send("Аватар пользователя успешно удален!");
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      await technicuesService.deleteTask(taskId);

      return res.send("Задача успешно удалена!");
    } catch (error) {
      next(error)
    }
  }

  async completedTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      console.log(taskId);
      await technicuesService.completeTask(taskId);

      return res.send("Аватар пользователя успешно удален!");
    } catch (error) {
      next(error)
    }
  }
}

export default new TechniquesController();