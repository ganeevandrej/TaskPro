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

  async getAnalytics(userId) {
    const result = await db.query("SELECT * FROM tasks WHERE user_id = $1", [
      userId,
    ]);

    const tasks = result.rows;

    if (tasks.length === 0) {
      return tasks;
    }

    const getPercentage = (tasks, status) => {
      const count = tasks.filter((el) => el.status === status).length;
      return count > 0 ? Math.trunc(count / tasks.length * 100) : count;
    };

    const active = {
      name: "Активные",
      population: getPercentage(tasks, "Активная"),
      color: "#2196F3",
      legendFontColor: "#2196F3",
      legendFontSize: 14,
    };
    const competed = {
      name: "Завершенные",
      population: getPercentage(tasks, "Завершена"),
      color: "#4CAF50",
      legendFontColor: "#4CAF50",
      legendFontSize: 14,
    };
    const overdue = {
      name: "Просроченные",
      population: getPercentage(tasks, "Просрочена"),
      color: "#F44336",
      legendFontColor: "#F44336",
      legendFontSize: 14,
    };

    return [active, competed, overdue];
  }
}

export default new UserService();
