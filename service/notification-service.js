import db from "../db/index.js";
import { Expo } from 'expo-server-sdk';


class NotificationService {
  async registerToken({ token, userId }) {
    if (token && Expo.isExpoPushToken(token)) {
      await db.query("UPDATE tokens SET push_token = $1 WHERE user_id = $2", [
        token,
        userId,
      ]);
    }

    const notifications = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1",
      [userId]
    );

    return notifications.rows;
  }
}

export default new NotificationService();
