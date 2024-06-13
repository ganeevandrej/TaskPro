import db from "../db/index.js";
import categoryService from "./category-service.js";
import { createTaskDto } from "../dtos/task-dto.js";

class TaskService {
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

    const categoriesFromDb = await categoryService.getCategories(userId);
    const prioritiesFromDb = await this.getPriorities();

    return createTaskDto(task.rows[0], categoriesFromDb, prioritiesFromDb);
  }

  async updateTask({ name, category, deadline, priority }, taskId) {
    const task = await db.query(
      `UPDATE tasks SET name=$1, category_id=$2, priority_id=$3, deadline=$4 WHERE id=$5 RETURNING *`,
      [name, category, priority, deadline, taskId]
    );

    if (task.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось обновить задачу!");
    }

    const categoriesFromDb = await categoryService.getCategories(
      task.rows[0].user_id
    );
    const prioritiesFromDb = await this.getPriorities();

    return createTaskDto(task.rows[0], categoriesFromDb, prioritiesFromDb);
  }

  async getTasks(userId, params, filters = {category: '0', status: '', priority: '0'}) {
    const { sort, search } = params;

    let query = `SELECT * FROM tasks WHERE user_id = ${userId}`;

    if (search) {
      query += ` AND name ILIKE '%${search}%'`;
    }

    if (filters.status) {
      query += ` AND status = '${filters.status}'`;
    }

    if (filters.category !== "0"  && filters.category !== "undefined") {
      query += ` AND category_id = '${filters.category}'`;
    }

    if (filters.priority !== "0" && filters.priority !== undefined) {
      query += ` AND priority_id = '${filters.priority}'`;
    }

    if (sort) {
      query += ` ORDER BY name ${sort}`;
    }

    const tasksFromDb = await db.query(query);
    const categoriesFromDb = await categoryService.getCategories(userId);
    const prioritiesFromDb = await this.getPriorities();

    return tasksFromDb.rows.map((task) => {
      return createTaskDto(task, categoriesFromDb, prioritiesFromDb);
    });
  }

  async deleteTask(taskId) {
    await db.query("DELETE FROM tasks WHERE id = $1", [taskId]);
  }

  async completeTask(taskId) {
    await db.query("UPDATE tasks SET status = $1 WHERE id = $2", [
      "Завершена",
      taskId,
    ]);
  }

  async getPriorities() {
    const prioritiesFromDb = await db.query("SELECT * FROM task_priorities");

    if (prioritiesFromDb.rows.length === 0) {
      throw ApiError.BadRequest("Не удалось получить приоритеты задач!");
    }

    return prioritiesFromDb.rows;
  }
}

export default new TaskService();
