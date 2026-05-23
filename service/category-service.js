import db from "../db/index.js";

class CategoryService {
  async createCategory({userId, nameCategory}) {
    const category = await db.query(
      `INSERT INTO categories (user_id, name) VALUES ($1, $2) RETURNING *;`,
      [userId, nameCategory]
    );

    if (category.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось создать категорию!");
    }

    return category.rows[0];
  }

  async updateCategory(categoryId, newNameCategory) {
    const category = await db.query(
      `UPDATE categories SET name=$1 WHERE id=$2 RETURNING *`,
      [newNameCategory, categoryId],
    );

    if (category.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось обновить категорию!");
    }

    return category.rows[0];
  }

  async deleteCategory(categoryId) {
    await db.query(
      "DELETE FROM categories WHERE id = $1",
      [categoryId]
    );
  }

  async getCategories(userId) {
    const categoriesFromDb = await db.query(
      "SELECT * FROM categories WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    if (categoriesFromDb.rows.length === 0) {
      return [];
    }

    return categoriesFromDb.rows;
  }
}

export default new CategoryService();