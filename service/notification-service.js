import db from "../db/index.js";
import { Expo } from "expo-server-sdk";

class NotificationService {
  async registerToken({ token, userId }) {
    if (token && Expo.isExpoPushToken(token)) {
      await db.query("UPDATE tokens SET push_token = $1 WHERE user_id = $2", [
        token,
        userId,
      ]);
    }

    const notifications = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    return notifications.rows.map((item) => ({
      id: item.id,
      message: item.message,
      status: item.status,
      createdAt: item.created_at,
    }));
  }

  async getNotifications(userId) {
    const notifications = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    return notifications.rows.map((item) => ({
      id: item.id,
      message: item.message,
      status: item.status,
      createdAt: item.created_at,
    }));
  }

  async readNotifications(userId) {
    await db.query(
      "UPDATE notifications SET status = $1 WHERE user_id = $2 AND status = $3",
      [true, userId, false]
    );

    const notifications = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    return notifications.rows.map((item) => ({
      id: item.id,
      message: item.message,
      status: item.status,
      createdAt: item.created_at,
    }));
  }

  async deleteNotification(taskId) {
    console.log(taskId);
    await db.query(
      "DELETE FROM notifications WHERE id = $1",
      [taskId]
    );
  }
}

export default new NotificationService();
