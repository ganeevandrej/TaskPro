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

  async getAnalytics(req, res, next) {
    try {
      const userId = req.params.userId;
      const analytics = await userService.getAnalytics(userId);

      return res.json(analytics);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
