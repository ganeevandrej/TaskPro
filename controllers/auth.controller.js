import { validationResult } from "express-validator";
import authService from "../service/auth-service.js";
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

      const userData = await authService.registration(email, password);
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
      const userData = await authService.login(email, password);
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
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json();
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const code = req.params.code;

      await authService.activate(code);

      return res.send("Ваш email успешно подтвержден!");
    } catch (error) {
      next(error);
    }
  }

  async sendLatterByEmail(req, res, next) {
    try {
      const userId = req.params.userId;

      await authService.sendLatter(userId);

      return res.send("Письмо успешно отправлено!");
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
