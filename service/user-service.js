import db from "../db/index.js";
import { createUserDto } from "../dtos/user-dto.js";
import { createTaskDto } from "../dtos/task-dto.js";

class UserService {
  async updateUserInfo(data, userId) {
    const { userName, phone, dataBirth } = data;

    await db.query(
      "UPDATE users SET phone=$1, date_birth=$2, user_name=$3 WHERE id=$4",
      [phone, dataBirth, userName, userId]
    );

    const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (user.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось обновить данные!");
    }

    return createUserDto(user.rows[0]);
  }

  async createTask({
    name,
    category,
    deadline,
    priority,
    createTask,
    status,
    userId,
  }) {
    const fieldsTab =
      "name, category_id, priority_id, deadline, user_id, status, create_at";

    const task = await db.query(
      `INSERT INTO tasks (${fieldsTab}) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [name, category, priority, deadline, userId, status, createTask]
    );

    if (task.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось создать задачу!");
    }

    const categoriesFromDb = await this.getCategories(userId);
    const prioritiesFromDb = await this.getPriorities();

    return createTaskDto(task.rows[0], categoriesFromDb, prioritiesFromDb);
  }

  async updateTask({
    name,
    category,
    deadline,
    priority,
  }, taskId) {
    const task = await db.query(
      `UPDATE tasks SET name=$1, category_id=$2, priority_id=$3, deadline=$4 WHERE id=$5 RETURNING *`,
      [name, category, priority, deadline, taskId],
    );

    if (task.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось обновить задачу!");
    }

    const categoriesFromDb = await this.getCategories(task.rows[0].user_id);
    const prioritiesFromDb = await this.getPriorities();

    console.log(categoriesFromDb, prioritiesFromDb);

    return createTaskDto(task.rows[0], categoriesFromDb, prioritiesFromDb);
  }

  async createCategory() {}

  async getCategories(userId) {
    const categoriesFromDb = await db.query(
      "SELECT * FROM categories WHERE user_id = $1",
      [userId]
    );

    if (categoriesFromDb.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось получить категории!");
    }

    return categoriesFromDb.rows;
  }

  async getTasks(userId) {
    const tasksFromDb = await db.query(
      "SELECT * FROM tasks WHERE user_id = $1",
      [userId]
    );

    if (tasksFromDb.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось получить задачи!");
    }

    const categoriesFromDb = await this.getCategories(userId);
    const prioritiesFromDb = await this.getPriorities();

    const tasks = tasksFromDb.rows.map(task => {
      return createTaskDto(task, categoriesFromDb, prioritiesFromDb);
    });

    return tasks;
  }

  async deleteTask(taskId) {
    await db.query(
      "DELETE FROM tasks WHERE id = $1",
      [taskId]
    );
  }

  async getPriorities() {
    const prioritiesFromDb = await db.query("SELECT * FROM task_priorities");

    if (prioritiesFromDb.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось получить приоритеты задач!");
    }

    return prioritiesFromDb.rows;
  }

  async completeTask(taskId) {
    await db.query(
      "UPDATE tasks SET status = $1 WHERE id = $2",
      ["Завершена", taskId]
    );
  }

  async getAvatar(userId) {
    const imageData = await db.query(
      "SELECT * FROM user_images WHERE user_id = $1",
      [userId]
    );

    if (imageData.rows.length === 0) {
      throw new Error("Аватар пользователя не найден!");
    }

    return `data:image/jpeg;base64,${imageData.rows[0].image_data.toString(
      "base64"
    )}`;
  }
}

export default new UserService();
