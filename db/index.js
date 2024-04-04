import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "rootroot",
  host: "localhost",
  port: "5432",
  database: "test_db",
});

export default pool;