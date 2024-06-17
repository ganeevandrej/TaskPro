import db from "../db/index.js";
import bcrypt from "bcryptjs";
import { createUserDto } from "../dtos/user-dto.js";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import { ApiError } from "../exceptions/api-error.js";
import { expo } from "../server.js";

export const generateConfirmationCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class AuthService {
  async registration(email, password) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      throw ApiError.BadRequest(
        `Пользователь с email ${email} уже зарегестрирован!`
      );
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const userData = await db.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, hashPassword]
    );

    const userDto = createUserDto(userData.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} не найден!`);
    }

    const isPassEquals = await bcrypt.compare(password, user.rows[0].password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = createUserDto(user.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(code) {
    const user = await db.query(
      "SELECT * FROM users WHERE activation_code = $1",
      [code]
    );

    if (user.rows.length === 0) {
      throw ApiError.BadRequest(`Код активации не верный!`);
    }

    await db.query(
      "UPDATE users SET is_activated=$1 WHERE activation_code=$2",
      [true, code]
    );

    const body = `Вы успешно подтвердили свою почту ${user.rows[0].email}!`;
    const creatAt = new Date().toISOString();

    await db.query(
      `INSERT INTO notifications (user_id, message, status, created_at) VALUES ($1, $2, $3, $4)`,
      [user.rows[0].id, body, false, creatAt]
    );

    const pushToken = await db.query(
      "SELECT push_token FROM tokens WHERE user_id = $1",
      [user.rows[0].id]
    );

    let messages = [];

    messages.push({
      to: pushToken.rows[0].push_token,
      sound: "default",
      title: "Email подтвержден",
      body,
      icon: "../client/assets/icon.png",
    });

    await expo.sendPushNotificationsAsync(messages);
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await db.query(
      "SELECT * FROM tokens WHERE refresh_token = $1",
      [refreshToken]
    );

    if (!userData || tokenFromDb.rows.length === 0) {
      throw ApiError.UnathorizedError();
    }

    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      userData.id,
    ]);

    const userDto = createUserDto(user.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async sendLatter(userId) {
    const code = generateConfirmationCode();

    const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (user.rows.length === 0) {
      throw ApiError.BadRequest("Произошла ошибка при отправке письма!");
    }

    await db.query("UPDATE users SET activation_code=$1 WHERE id=$2", [
      code,
      userId,
    ]);

    mailService.sendActivationMail(user.rows[0].email, code);
  }
}

export default new AuthService();
