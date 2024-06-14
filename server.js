import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import taskRouter from "./routes/task.routes.js";
import categoryRouter from "./routes/category.routes.js";
import fileRouter from "./routes/file.routes.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import { Expo } from 'expo-server-sdk';

const app = express();
const port = process.env.PORT || 3000;
export let expo = new Expo();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:8081"],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/api/auth", authRouter);
app.use("/api/upload", fileRouter);
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/notifications", notificationRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
