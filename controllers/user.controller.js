import db from "../db/index.js";
import userService from "../service/user-service.js";

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      res.status(400).json({ message: "Произошла ошибка при регистрации!" });
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }

  async activate(req, res, next) {
    try {
    } catch (error) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      const users = await db.query("SELECT * FROM users");
      res.json(users.rows);
    } catch (error) {
      res.status(400).json({ massage: error.message });
    }
  }
}

export default new UserController();
