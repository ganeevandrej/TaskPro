import db from "../db/index.js";

class FileService {
  async uploadAvatar(image, userId) {
    const imageFromDb = await db.query(
      "SELECT * FROM user_images WHERE user_id = $1",
      [userId]
    );

    if (imageFromDb.rows.length > 0) {
      await db.query("UPDATE user_images SET image_data=$1 WHERE user_id=$2", [
        image,
        userId,
      ]);
    } else {
      await db.query(
        "INSERT INTO user_images(image_data, user_id) VALUES($1, $2);",
        [image, userId]
      );
    }

    const imageData = await db.query(
      "SELECT * FROM user_images WHERE user_id = $1",
      [userId]
    );

    const imageUrl = `data:image/jpeg;base64,${imageData.rows[0].image_data.toString(
      "base64"
    )}`;

    return imageUrl;
  }

  async deleteAvatar(userId) {
    await db.query(
      "DELETE FROM user_images WHERE user_id = $1",
      [userId]
    );
  }
}

export default new FileService();
