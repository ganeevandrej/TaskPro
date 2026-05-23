import NotificationService from "../service/notification-service.js";

class NotificationController {
  async registerToken(req, res, next) {
    try {
      const body = req.body;
      const notifications = await NotificationService.registerToken(body);

      return res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async getNotifications(req, res, next) {
    try {
      const userId = req.params.userId;
      const notifications = await NotificationService.getNotifications(userId);

      return res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async readNotifications(req, res, next) {
    try {
      const userId = req.params.userId;
      const notifications = await NotificationService.readNotifications(userId);

      return res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async sendNotification(req, res, next) {
    try {
      const data = req.body;
      await NotificationService.sendNotification(data);

      return res.send("Уведомление удалено!");
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(req, res, next) {
    try {
      const taskId = req.params.taskId;
      await NotificationService.deleteNotification(taskId);

      return res.send("Уведомление удалено!");
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
