import db from "../db/index.js";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { createUserDto } from "../dtos/user-dto.js";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import { ApiError } from "../exceptions/api-error.js";

class UserService {
  async registration(email, password) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} уже зарегестрирован!`);
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    
    const generateConfirmationCode = () => {
      const min = 100000;
      const max = 999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const code = generateConfirmationCode();

    await db.query(
      "INSERT INTO users(email, password, activation_code) VALUES($1, $2, $3);",
      [email, hashPassword, code]
    );

    mailService.sendActivationMail(email, code);

    const userData = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const userDto = createUserDto(userData.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async login(email, password) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} не найден!`);
    }

    const isPassEquals = await bcrypt.compare(password, user.rows[0].password);

    if(!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = createUserDto(user.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async activate(code) {
    const user = await db.query("SELECT * FROM users WHERE activation_code = $1", [
      code
    ]);

    if (user.rows.length === 0) {
      throw ApiError.BadRequest(`Неккоректная ссылка активации!`);
    }

    await db.query(
      "UPDATE users SET is_activated=$1 WHERE activation_code=$2",
      [true, code]
    );
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await db.query(
      "SELECT * FROM tokens WHERE refresh_token = $1",
      [refreshToken]
    );

    if(!userData || tokenFromDb.rows.length === 0) {
      throw ApiError.UnathorizedError();
    }

    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      userData.id
    ]);

    const userDto = createUserDto(user.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async getAllUsers() {
    const users = await db.query("SELECT * FROM users");
    return users.rows;
  }
}

export default new UserService();
