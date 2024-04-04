import db from "../db/index.js";
import bcrypt from "bcryptjs";

export const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже зарегестрирован!" });
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    await db.query(
      "INSERT INTO users(email, password) VALUES($1, $2)",
      [email, hashPassword]
    );
    return res.json({ message: "Пользователь успешно зарегистрирован!" });
  } catch (error) {
    res.status(400).json({ message: "Произошла ошибка при регистрации!" });
  }
};

export const login = async (req, res) => {
  console.log(res);
};
