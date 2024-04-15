import jwt from "jsonwebtoken";
import db from "../db/index.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "60d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
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

  async removeToken(refreshToken) {
    await db.query(
      "DELETE FROM tokens WHERE refresh_token = $1",
      [refreshToken]
    );
  }
}

export default new TokenService();
