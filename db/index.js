import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "test_db",
});

pool.connect().then(() => {
  console.log('Подключение к БД успешно!');
}).catch((err) => {
  console.error('Ошибка подключения к БД:', err);
  process.exit(-1);
});

export default pool;