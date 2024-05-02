import db from "../db/index.js";
import fs from "fs";

class UserController {
  async setUserAvatar(req, res, next) {
    console.log("ghjgjgj");
    try {
      const userId = req.body.userId;
      const imageData = req.file.buffer;
      console.log(imageData);

      await db.query(
        "INSERT INTO user_images(image_data, user_id) VALUES($1, $2);",
        [imageData, userId]
      );

      return res.status(200).send("hello");
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
