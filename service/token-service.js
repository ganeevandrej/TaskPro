import jwt from "jsonwebtoken";
import db from "../db/index.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(user_id, refresh) {
    const tokenData = await db.query(
      "SELECT * FROM tokens WHERE user_id = $1",
      [user_id]
    );

    if (tokenData.rows.length > 0) {
      return await db.query(
        "UPDATE tokens SET refresh_token=$1 WHERE user_id=$2",
        [refresh, user_id]
      );
    }

    await db.query(
      "INSERT INTO tokens(user_id, refresh_token) VALUES($1, $2)",
      [user_id, refresh]
    );
  }
}

export default new TokenService();
