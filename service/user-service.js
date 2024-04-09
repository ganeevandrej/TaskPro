import db from "../db/index.js";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { createUserDto } from "../dtos/user-dto.js";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";

class UserService {
  async registration(email, password) {
    const users = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length > 0) {
      throw new Error(`Пользователь с таким ${email} уже зарегестрирован!`);
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const generiteLink = v4();

    await db.query(
      "INSERT INTO users(email, password, activation_link) VALUES($1, $2, $3);",
      [email, hashPassword, generiteLink]
    );

    const activationLink = `${process.env.API_URL}/api/activate/${generiteLink}`;
    mailService.sendActivationMail(email, activationLink);

    const userData = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const userDto = createUserDto(userData.rows[0]);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }
}

export default new UserService();
