import db from "../db/index.js";

export const getUsers = async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  res.json(users.rows);
};