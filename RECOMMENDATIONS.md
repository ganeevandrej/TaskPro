# Рекомендации по улучшению проекта TaskPro

## 🔴 Критические проблемы безопасности

### 1. SQL Injection уязвимость в `service/task-service.js`

**Проблема:** Прямое встраивание переменных в SQL запросы в методе `getTasks()` (строки 155-175)

**Текущий код:**
```javascript
let query = `SELECT * FROM tasks WHERE user_id = ${userId}`;
if (search) {
  query += ` AND name ILIKE '%${search}%'`;
}
if (filters.status) {
  query += ` AND status = '${filters.status}'`;
}
```

**Риск:** Критическая уязвимость SQL Injection

**Решение:** Использовать параметризованные запросы
```javascript
async getTasks(userId, params, filters = { category: "0", status: "", priority: "0" }) {
  const { sort, search } = params;
  
  const conditions = ['user_id = $1'];
  const values = [userId];
  let paramIndex = 2;
  
  if (search) {
    conditions.push(`name ILIKE $${paramIndex}`);
    values.push(`%${search}%`);
    paramIndex++;
  }
  
  if (filters.status) {
    conditions.push(`status = $${paramIndex}`);
    values.push(filters.status);
    paramIndex++;
  }
  
  if (filters.category !== "0" && filters.category !== "undefined") {
    conditions.push(`category_id = $${paramIndex}`);
    values.push(filters.category);
    paramIndex++;
  }
  
  if (filters.priority !== "0" && filters.priority !== undefined) {
    conditions.push(`priority_id = $${paramIndex}`);
    values.push(filters.priority);
    paramIndex++;
  }
  
  let query = `SELECT * FROM tasks WHERE ${conditions.join(' AND ')}`;
  
  if (sort) {
    // Валидация sort для предотвращения SQL injection
    const validSorts = ['ASC', 'DESC'];
    const sortUpper = sort.toUpperCase();
    if (validSorts.includes(sortUpper)) {
      query += ` ORDER BY name ${sortUpper}`;
    }
  }
  
  const tasksFromDb = await db.query(query, values);
  // ... остальной код
}
```

### 2. Хардкод учетных данных БД в `db/index.js`

**Проблема:** Пароль и другие данные БД захардкожены в коде (строка 7)

**Текущий код:**
```javascript
const pool = new Pool({
  user: "postgres",
  password: "rootroot",  // ⚠️ КРИТИЧНО!
  host: "localhost",
  port: "5432",
  database: "test_db",
});
```

**Решение:** Использовать переменные окружения
```javascript
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "test_db",
});

export default pool;
```

**Добавить в `.env`:**
```
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=test_db
```

### 3. Опечатка в методе ошибки

**Проблема:** В `exceptions/api-error.js` метод `UnathorizedError` имеет опечатку

**Текущий код:**
```javascript
static UnathorizedError() {  // ❌ Опечатка
```

**Решение:**
```javascript
static UnauthorizedError() {  // ✅ Правильно
```

**Места, где нужно исправить:**
- `exceptions/api-error.js` (строка 11)
- `middlewares/auth-middleware.js` (строки 9, 15, 21, 27)
- `service/auth-service.js` (строка 110)

---

## 🟠 Высокий приоритет - Архитектурные улучшения

### 4. Внедрение Repository Pattern

**Проблема:** SQL запросы разбросаны по всем сервисам, нет слоя абстракции для работы с БД

**Предложение:** Создать слой репозиториев

**Структура:**
```
repository/
  ├── task-repository.js
  ├── user-repository.js
  ├── category-repository.js
  └── notification-repository.js
```

**Пример `repository/task-repository.js`:**
```javascript
import db from "../db/index.js";

class TaskRepository {
  async findById(taskId) {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [taskId]);
    return result.rows[0];
  }
  
  async findByUserId(userId, filters = {}) {
    const conditions = ['user_id = $1'];
    const values = [userId];
    let paramIndex = 2;
    
    // Построение параметризованного запроса...
    
    const result = await db.query(query, values);
    return result.rows;
  }
  
  async create(taskData) {
    const result = await db.query(
      `INSERT INTO tasks (name, category_id, priority_id, deadline, user_id, status, create_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [taskData.name, taskData.category, taskData.priority, taskData.deadline, 
       taskData.userId, taskData.status, taskData.createAt]
    );
    return result.rows[0];
  }
  
  async update(taskId, taskData) {
    const result = await db.query(
      `UPDATE tasks SET name=$1, category_id=$2, priority_id=$3, deadline=$4 
       WHERE id=$5 RETURNING *`,
      [taskData.name, taskData.category, taskData.priority, taskData.deadline, taskId]
    );
    return result.rows[0];
  }
  
  async delete(taskId) {
    await db.query("DELETE FROM tasks WHERE id = $1", [taskId]);
  }
}

export default new TaskRepository();
```

**Использование в сервисе:**
```javascript
import taskRepository from "../repository/task-repository.js";

class TaskService {
  async getTasks(userId, params, filters) {
    const tasks = await taskRepository.findByUserId(userId, filters);
    // Бизнес-логика обработки задач...
    return tasks;
  }
}
```

### 5. Улучшение обработки ошибок

**Проблема:** Нет централизованного логирования ошибок, отсутствует обработка некоторых типов ошибок

**Улучшения:**

**5.1. Расширить `exceptions/api-error.js`:**
```javascript
export class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static UnauthorizedError(message = "Пользователь не авторизован!") {
        return new ApiError(401, message);
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    
    static NotFound(message = "Ресурс не найден!") {
        return new ApiError(404, message);
    }
    
    static Forbidden(message = "Доступ запрещен!") {
        return new ApiError(403, message);
    }
    
    static InternalServerError(message = "Внутренняя ошибка сервера!") {
        return new ApiError(500, message);
    }
}
```

**5.2. Улучшить `middlewares/error-middleware.js`:**
```javascript
import { ApiError } from "../exceptions/api-error.js";
import logger from "../utils/logger.js"; // Добавить логгер

export function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        logger.warn(`API Error: ${err.status} - ${err.message}`, {
            status: err.status,
            message: err.message,
            errors: err.errors,
            path: req.path,
            method: req.method
        });
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }
    
    logger.error('Unexpected error:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    
    return res.status(500).json({
        message: "Непредвиденная ошибка!",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}
```

### 6. Добавление валидации запросов

**Проблема:** Не все эндпоинты имеют валидацию входных данных

**Решение:** Добавить валидацию для всех контроллеров задач

**Пример для `routes/task.routes.js`:**
```javascript
import Router from "express";
import taskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { body, param, query, validationResult } from "express-validator";
import { validateRequest } from "../middlewares/validate-middleware.js"; // Создать

const router = new Router();

const taskValidation = [
    body("name").trim().isLength({ min: 1, max: 255 }).withMessage("Название задачи обязательно"),
    body("category").optional().isUUID().withMessage("Неверный формат категории"),
    body("deadline").optional().isISO8601().withMessage("Неверный формат даты"),
    body("priority").optional().isInt().withMessage("Неверный формат приоритета"),
    body("status").optional().isIn(["Новая", "В процессе", "Завершена", "Просрочена"]),
];

router.get(
    "/all/:userId",
    authMiddleware,
    param("userId").isInt().withMessage("Неверный ID пользователя"),
    query("search").optional().trim(),
    query("sort").optional().isIn(["ASC", "DESC"]),
    validateRequest,
    taskController.getTasks
);

router.post(
    "/new",
    authMiddleware,
    taskValidation,
    validateRequest,
    taskController.createTask
);

router.put(
    "/update/:taskId",
    authMiddleware,
    param("taskId").isInt().withMessage("Неверный ID задачи"),
    taskValidation,
    validateRequest,
    taskController.updateTask
);

export default router;
```

**Создать `middlewares/validate-middleware.js`:**
```javascript
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";

export function validateRequest(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
    }
    
    next();
}
```

### 7. Проблемы с Cron Jobs

**Проблема:** Глобальная переменная `cronJobs` в `task-service.js` теряется при перезапуске сервера

**Текущий код:**
```javascript
let cronJobs = {}; // ❌ Теряется при перезапуске
```

**Решение:** 
1. Хранить запланированные задачи в БД
2. Восстанавливать cron jobs при старте сервера
3. Использовать отдельный сервис для управления расписанием

**Создать `service/scheduler-service.js`:**
```javascript
import { CronJob } from "cron";
import db from "../db/index.js";
import taskService from "./task-service.js";

class SchedulerService {
  constructor() {
    this.cronJobs = new Map();
  }

  async scheduleTaskNotification(taskId, deadline, userId) {
    // Отменить существующий job, если есть
    this.cancelTaskNotification(taskId);
    
    const date = new Date(deadline);
    const job = new CronJob(
      date,
      async () => {
        await taskService.handleTaskOverdue(taskId, userId);
        this.cronJobs.delete(taskId);
      },
      null,
      true,
      "UTC"
    );
    
    this.cronJobs.set(taskId, job);
    
    // Сохранить в БД для восстановления после перезапуска
    await this.saveScheduledTask(taskId, deadline, userId);
  }
  
  cancelTaskNotification(taskId) {
    const job = this.cronJobs.get(taskId);
    if (job) {
      job.stop();
      this.cronJobs.delete(taskId);
    }
  }
  
  async restoreScheduledTasks() {
    // Восстановить все запланированные задачи из БД при старте
    const result = await db.query(
      "SELECT id, deadline, user_id FROM tasks WHERE deadline > NOW() AND status NOT IN ('Завершена', 'Просрочена')"
    );
    
    for (const task of result.rows) {
      await this.scheduleTaskNotification(task.id, task.deadline, task.user_id);
    }
  }
  
  async saveScheduledTask(taskId, deadline, userId) {
    // Сохранить в отдельную таблицу scheduled_tasks или обновить поле в tasks
  }
}

export default new SchedulerService();
```

### 8. Улучшение CORS настроек

**Проблема:** Отсутствуют PUT и PATCH методы в CORS настройках

**Текущий код в `server.js`:**
```javascript
methods: ["GET", "POST", "DELETE"], // ❌ Нет PUT, PATCH
```

**Решение:**
```javascript
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### 9. Добавление логирования

**Проблема:** Отсутствует структурированное логирование

**Решение:** Установить и настроить Winston

```bash
npm install winston
```

**Создать `utils/logger.js`:**
```javascript
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "taskpro-api" },
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
```

---

## 🟡 Средний приоритет - Улучшения кода

### 10. Удаление отладочного кода

**Проблема:** В `service/task-service.js` строка 116 содержит `console.log("hi")`

**Решение:** Удалить все `console.log` и использовать логгер

### 11. Вынесение констант

**Проблема:** Магические числа в коде (например, `30 * 24 * 60 * 60 * 1000`)

**Решение:** Создать файл `constants/index.js`:
```javascript
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 дней
export const ACCESS_TOKEN_EXPIRES_IN = "30m";
export const REFRESH_TOKEN_EXPIRES_IN = "60d";
export const TASK_STATUSES = {
  NEW: "Новая",
  IN_PROGRESS: "В процессе",
  COMPLETED: "Завершена",
  OVERDUE: "Просрочена",
};
```

### 12. Исправление багов в логике

**12.1. Баг в проверке пустого массива в `task-service.js:180`:**
```javascript
// Текущий код (неправильно):
if(tasksFromDb.rows[0] === 0) {
  return [];
}

// Правильно:
if(tasksFromDb.rows.length === 0) {
  return [];
}
```

**12.2. Несоответствие переменных в `task-service.js:136-138`:**
```javascript
// Текущий код:
if (cronJobs[task.id]) {
  cronJobs[taskId].stop();  // ❌ Используется taskId вместо task.id
  delete cronJobs[taskId];
}

// Правильно:
if (cronJobs[task.id]) {
  cronJobs[task.id].stop();
  delete cronJobs[task.id];
}
```

### 13. Проверка на null/undefined в push-уведомлениях

**Проблема:** В `sendPushNotification` и `sendPushNotificationCompleted` нет проверки на наличие push_token

**Решение:**
```javascript
export const sendPushNotification = async (task, userId) => {
  const pushTokenResult = await db.query(
    "SELECT push_token FROM tokens WHERE user_id = $1",
    [userId]
  );
  
  if (!pushTokenResult.rows[0] || !pushTokenResult.rows[0].push_token) {
    logger.warn(`Push token not found for user ${userId}`);
    return; // Не отправляем уведомление, если нет токена
  }
  
  // ... остальной код
};
```

### 14. Разделение ответственности в сервисах

**Проблема:** `auth-service.js` содержит логику отправки push-уведомлений

**Решение:** Вынести в `notification-service.js`:
```javascript
// notification-service.js
async sendPushNotification(userId, title, body, data) {
  // Логика отправки
}

// auth-service.js
import notificationService from "./notification-service.js";

async activate(code) {
  // ... код активации
  await notificationService.sendPushNotification(
    user.rows[0].id,
    "Email подтвержден",
    body,
    {}
  );
}
```

---

## 🔵 Низкий приоритет - Frontend улучшения

### 15. Переменные окружения для API URL

**Проблема:** В `client/src/http/index.ts` захардкожен API URL

**Текущий код:**
```typescript
export const API_URL = 'http://192.168.1.67:5000/api';
```

**Решение:** Использовать переменные окружения

**Установить `react-native-config` или использовать Expo Constants:**
```typescript
import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000/api';
```

**В `client/app.json`:**
```json
{
  "expo": {
    "extra": {
      "apiUrl": process.env.API_URL || "http://localhost:5000/api"
    }
  }
}
```

### 16. Улучшение обработки ошибок в axios интерцепторе

**Проблема:** В `client/src/http/index.ts:33` нет проверки на существование `error.response`

**Текущий код:**
```typescript
if(error.response.status == 401 && ...) { // ❌ Может быть undefined
```

**Решение:**
```typescript
$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const res = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { 
          withCredentials: true 
        });
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        return $api.request(originalRequest);
      } catch (refreshError) {
        // Обработка ошибки обновления токена
        await AsyncStorage.removeItem('accessToken');
        // Редирект на страницу входа
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

### 17. Добавление миграций БД

**Проблема:** Отсутствует система миграций для управления схемой БД

**Решение:** Использовать `node-pg-migrate`:

```bash
npm install --save-dev node-pg-migrate
```

**Создать структуру:**
```
migrations/
  ├── 001_create_users_table.js
  ├── 002_create_tasks_table.js
  └── ...
```

---

## 📋 Паттерны проектирования для внедрения

### 18. Repository Pattern (уже описано в пункте 4)

### 19. Service Layer Pattern (улучшить текущий)

Текущая архитектура уже использует сервисный слой, но можно улучшить:
- Разделить сервисы на более мелкие, специализированные
- Использовать Dependency Injection для тестируемости

### 20. DTO Pattern (расширить использование)

Уже используется, но можно улучшить:
- Создать DTO для всех входных/выходных данных API
- Добавить валидацию в DTO

### 21. Factory Pattern

Для создания разных типов задач/уведомлений:
```javascript
class TaskFactory {
  static create(type, data) {
    switch(type) {
      case 'regular':
        return new RegularTask(data);
      case 'technique':
        return new TechniqueTask(data);
      default:
        throw new Error('Unknown task type');
    }
  }
}
```

### 22. Observer Pattern

Для системы уведомлений:
```javascript
class NotificationObserver {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  notify(event, data) {
    this.observers.forEach(observer => observer.update(event, data));
  }
}
```

### 23. Strategy Pattern

Для разных стратегий фильтрации/сортировки:
```javascript
class SortStrategy {
  sort(tasks) {
    throw new Error('Sort method must be implemented');
  }
}

class NameSortStrategy extends SortStrategy {
  sort(tasks) {
    return tasks.sort((a, b) => a.name.localeCompare(b.name));
  }
}
```

---

## 🎯 Приоритетный план действий

### Критично (исправить немедленно):
1. ✅ Исправить SQL injection в `task-service.js`
2. ✅ Убрать хардкод паролей из `db/index.js`
3. ✅ Исправить опечатку `UnathorizedError`

### Высокий приоритет (в течение недели):
4. ✅ Добавить валидацию запросов для всех эндпоинтов
5. ✅ Улучшить обработку ошибок (логирование, расширение ApiError)
6. ✅ Добавить логирование (Winston)
7. ✅ Вынести API URL в переменные окружения на фронтенде
8. ✅ Исправить баги в логике (проверка массива, несоответствие переменных)

### Средний приоритет (в течение месяца):
9. ✅ Внедрить Repository Pattern
10. ✅ Решить проблему с Cron Jobs (хранение в БД)
11. ✅ Добавить миграции БД
12. ✅ Разделить ответственность в сервисах

### Низкий приоритет (по возможности):
13. ✅ Миграция backend на TypeScript
14. ✅ Добавить тесты (unit, integration)
15. ✅ Оптимизация производительности
16. ✅ Улучшение документации

---

## 📝 Дополнительные замечания

### Орфографические ошибки:
- `sendLatter` → `sendLetter` (в `auth-service.js:135` и `auth.controller.js:68`)
- `creatAt` → `createdAt` (в нескольких местах)
- "зарегестрирован" → "зарегистрирован" (в `auth-service.js:23`)
- `halpers.ts` → `helpers.ts` (файл в `client/src/Navigation/`)

### Соглашения об именовании:
- Использовать единый стиль именования (camelCase для переменных, PascalCase для классов)
- Переименовать файл `halpers.ts` → `helpers.ts`

### Структура проекта:
- Рассмотреть разделение на модули по доменам:
  ```
  modules/
    ├── auth/
    │   ├── controllers/
    │   ├── services/
    │   ├── routes/
    │   └── dtos/
    ├── tasks/
    └── ...
  ```

---

**Дата создания документа:** 2024
**Последнее обновление:** 2024
