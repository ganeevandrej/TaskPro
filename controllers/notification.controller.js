import NotificationService from "../service/notification-service.js";

class NotificationController {
  async registerToken(req, res, next) {
    try {
      const body = req.body;
      const notifications = await NotificationService.registerToken(body);

      return res.send(notifications);
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
