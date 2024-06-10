import db from "../db/index.js";

class FileService {
  async uploadAvatar(image, userId) {
    const imageFromDb = await db.query(
      "SELECT * FROM image_user WHERE user_id = $1",
      [userId]
    );

    if (imageFromDb.rows.length > 0) {
      await db.query("UPDATE image_user SET avatar=$1 WHERE user_id=$2", [
        image,
        userId,
      ]);
    } else {
      await db.query(
        "INSERT INTO image_user(avatar, user_id) VALUES($1, $2)",
        [image, userId]
      );
    }

    const imageData = await db.query(
      "SELECT * FROM image_user WHERE user_id = $1",
      [userId]
    );

    const imageUrl = `data:image/jpeg;base64,${imageData.rows[0].avatar.toString(
      "base64"
    )}`;

    return imageUrl;
  }

  async deleteAvatar(userId) {
    await db.query(
      "DELETE FROM image_user WHERE user_id=$1",
      [null, userId]
    );
  }
}

export default new FileService();
