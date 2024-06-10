import db from "../db/index.js";
import { createUserDto } from "../dtos/user-dto.js";

class UserService {
  async updateUserInfo(data, userId) {
    const { userName, phone, dataBirth } = data;

    await db.query(
      "UPDATE users SET phone=$1, date_birth=$2, user_name=$3 WHERE id=$4",
      [phone, dataBirth, userName, userId]
    );

    const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (user.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось обновить данные!");
    }

    return createUserDto(user.rows[0]);
  }

  async getAvatar(userId) {
    const imageData = await db.query(
      "SELECT * FROM image_user WHERE user_id = $1",
      [userId]
    );

    if (imageData.rows.length === 0) {
      throw new Error("Аватар пользователя не найден!");
    }

    return `data:image/jpeg;base64,${imageData.rows[0].avatar.toString(
      "base64"
    )}`;
  }
}

export default new UserService();
