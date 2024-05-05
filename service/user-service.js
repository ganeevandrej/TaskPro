import db from "../db/index.js";
import { createUserDto } from "../dtos/user-dto.js";

class UserService {
  async updateUserInfo(data, userId) {
    const { userName, phone, dataBirth } = data;

    await db.query(
      "UPDATE users SET phone=$1, date_birth=$2, user_name=$3 WHERE id=$4",
      [phone, dataBirth, userName, userId]
    );

    const user = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    if(user.rows.length === 0) {
        throw new Error("Произошла ошибка!");
    }

    return createUserDto(user.rows[0]);
  }
}

export default new UserService();
