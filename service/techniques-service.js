import db from "../db/index.js";
import { createTaskDtoTechnique } from "../dtos/task-dto.js";
import TaskService from "./task-service.js";
import { CronJob } from "cron";
import { expo } from "../server.js";
import {sendPushNotificationCompleted} from "./task-service.js";

let cronJobs = {};

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

export const sendPushNotification = async (task, userId) => {
  const pushToken = await db.query(
    "SELECT push_token FROM tokens WHERE user_id = $1",
    [userId]
  );

  const taskOverdue = await db.query(
    "UPDATE tasks_techniques SET status=$1 WHERE id=$2 RETURNING *",
    ["Просрочена", task.id]
  );

  const creatAt = new Date().toISOString();

  await db.query(
    `INSERT INTO notifications (user_id, message, status, created_at) VALUES ($1, $2, $3, $4)`,
    [userId, `Задача "${task.title}" просрочена!`, false, creatAt]
  );

  const messages = [];

  messages.push({
    to: pushToken.rows[0].push_token,
    sound: "default",
    title: "Задча Просрочилась",
    body: `Задача "${task.title}" просрочилась!`,
    data: taskOverdue.rows[0],
    icon: "../client/assets/icon.png",
  });

  try {
    await expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

class TechniquesService {
  async createTask({ title, technique, deadline, priority, status, userId }) {
    const fieldsTab =
      "title, technique, priority_id, deadline, user_id, status";

    const result = await db.query(
      `INSERT INTO tasks_techniques (${fieldsTab}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [title, technique, priority, deadline, userId, status]
    );
    const task = result.rows[0];

    if (!task.id) {
      throw ApiError.BadRequest("Не удалось создать задачу!");
    }

    task.deadline && scheduleTaskNotification(task, userId);
    const prioritiesFromDb = await TaskService.getPriorities();

    return createTaskDtoTechnique(task, prioritiesFromDb);
  }

  async updateTask(
    taskId,
    { title, technique, deadline, priority }
  ) {
    const fieldsTab =
      "title, technique, priority_id, deadline, user_id, status";

    const result = await db.query(
      `UPDATE tasks_techniques SET title=$1, technique=$2, priority_id=$3, deadline=$4 WHERE id=$5 RETURNING *`,
      [title, technique, priority, deadline, taskId]
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
    const prioritiesFromDb = await TaskService.getPriorities();

    return createTaskDtoTechnique(task, prioritiesFromDb);
  }

  async getTask(userId, technique) {
    const res = await db.query(
      `SELECT * FROM tasks_techniques WHERE user_id = $1 AND technique = $2`,
      [userId, technique]
    );

    const prioritiesFromDb = await TaskService.getPriorities();
    return createTaskDtoTechnique(res.rows[0], prioritiesFromDb);
  }

  async getTasks(userId, technique) {
    const res = await db.query(
      `SELECT * FROM tasks_techniques WHERE user_id = $1 AND technique = $2`,
      [userId, technique]
    );

    const prioritiesFromDb = await TaskService.getPriorities();

    if (prioritiesFromDb.length > 0) {
      return res.rows.map((task) => {
        return createTaskDtoTechnique(task, prioritiesFromDb);
      });
    }

    return res.rows;
  }

  async deleteTask(taskId) {
    await db.query("DELETE FROM tasks_techniques WHERE id = $1", [taskId]);

    if (cronJobs[taskId]) {
      cronJobs[taskId].stop();
      delete cronJobs[taskId];
    }
  }

  async completeTask(taskId) {
    const res = await db.query("UPDATE tasks_techniques SET status = $1 WHERE id = $2 RETURNING *", [
      "Завершена",
      taskId,
    ]);

    if (cronJobs[taskId]) {
      cronJobs[taskId].stop();
      delete cronJobs[taskId];
    }

    const task = res.rows[0];
    sendPushNotificationCompleted(task, task.user_id);
    
    const prioritiesFromDb = await TaskService.getPriorities();

    return createTaskDtoTechnique(task, prioritiesFromDb);
  }
}

export default new TechniquesService();
