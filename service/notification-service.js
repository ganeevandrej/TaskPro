import db from "../db/index.js";

class NotificationService {
  async registerToken({ token, userId }) {
    await db.query("UPDATE tokens SET push_token = $1 WHERE user_id = $2", [
      token,
      userId,
    ]);

    const notifications = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1",
      [userId]
    );

    return notifications.rows;
  }
}

export default new NotificationService();
