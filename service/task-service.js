import db from "../db/index.js";
import categoryService from "./category-service.js";
import { createTaskDto } from "../dtos/task-dto.js";
import { CronJob } from "cron";
import { expo } from "../server.js";

let cronJobs = {};
let messages = [];

const scheduleTaskNotification = (task, userId) => {
  const date = new Date(task.deadline);
  const job = new CronJob(
    date,
    async () => {
      sendPushNotification(task, userId);
    },
    null,
    true,
    "UTC"
  );

  cronJobs[task.id] = job;
};

const sendPushNotification = async (task, userId) => {
  const pushToken = await db.query(
    "SELECT push_token FROM tokens WHERE user_id = $1",
    [userId]
  );

  const taskOverdue = await db.query(
    "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
    ["Просрочена", task.id]
  );

  const creatAt = new Date().toISOString();

  await db.query(
    `INSERT INTO notifications (user_id, message, status, created_at) VALUES ($1, $2, $3, $4)`,
    [userId, `Задача "${task.name}" просрочена!`, false, creatAt]
  );

  messages.push({
    to: pushToken.rows[0].push_token,
    sound: "default",
    title: "Задча Просрочилась",
    body: `Задача "${task.name}" просрочилась!`,
    data: taskOverdue.rows[0],
    icon: "../client/assets/icon.png",
  });

  try {
    const response = await expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

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

    const result = await db.query(
      `INSERT INTO tasks (${fieldsTab}) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [name, category, priority, deadline, userId, status, createTask]
    );
    const task = result.rows[0];

    if (!task.id) {
      throw ApiError.BadRequest("Не удалось создать задачу!");
    }

    task.deadline && scheduleTaskNotification(task, userId);
    const categoriesFromDb = await categoryService.getCategories(userId);
    const prioritiesFromDb = await this.getPriorities();

    return createTaskDto(task, categoriesFromDb, prioritiesFromDb);
  }

  async updateTask({ name, category, deadline, priority }, taskId) {
    const result = await db.query(
      `UPDATE tasks SET name=$1, category_id=$2, priority_id=$3, deadline=$4 WHERE id=$5 RETURNING *`,
      [name, category, priority, deadline, taskId]
    );
    const task = result.rows[0];

    if (!task.id) {
      throw ApiError.BadRequest("Не удалось обновить задачу!");
    }

    if (cronJobs[task.id]) {
      cronJobs[taskId].stop();
      delete cronJobs[taskId];
    }

    task.deadline && scheduleTaskNotification(task, task.user_id);
    const categoriesFromDb = await categoryService.getCategories(task.user_id);
    const prioritiesFromDb = await this.getPriorities();

    return createTaskDto(task, categoriesFromDb, prioritiesFromDb);
  }

  async getTasks(
    userId,
    params,
    filters = { category: "0", status: "", priority: "0" }
  ) {
    const { sort, search } = params;

    let query = `SELECT * FROM tasks WHERE user_id = ${userId}`;

    if (search) {
      query += ` AND name ILIKE '%${search}%'`;
    }

    if (filters.status) {
      query += ` AND status = '${filters.status}'`;
    }

    if (filters.category !== "0" && filters.category !== "undefined") {
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
    if (cronJobs[taskId]) {
      cronJobs[taskId].stop();
      delete cronJobs[taskId];
    }
  }

  async completeTask(taskId) {
    await db.query("UPDATE tasks SET status = $1 WHERE id = $2", [
      "Завершена",
      taskId,
    ]);

    if (cronJobs[taskId]) {
      cronJobs[taskId].stop();
      delete cronJobs[taskId];
    }
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
