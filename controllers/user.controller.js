import db from "../db/index.js";
import userService from "../service/user-service.js";

class UserController {
  async getAvatar(req, res, next) {
    try {
      const userId = req.params.userId;

      const imageData = await db.query(
        "SELECT * FROM user_images WHERE user_id = $1",
        [userId]
      );

      if(imageData.rows.length === 0) {
        throw new Error("Аватар пользователя не найден!");
      }

      const imageUrl = `data:image/jpeg;base64,${imageData.rows[0].image_data.toString('base64')}`;
      
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

      console.log(user);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
