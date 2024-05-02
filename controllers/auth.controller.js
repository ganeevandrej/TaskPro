import { validationResult } from "express-validator";
import userService from "../service/auth-service.js";
import { ApiError } from "../exceptions/api-error.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      const { email, password, passwordRepeat } = req.body;
      if (!errors.isEmpty() || password !== passwordRepeat) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json();
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const code = req.params.code;
      await userService.activate(code);

      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
