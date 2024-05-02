import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import multer from "multer";

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.use(express.json());
app.use(upload.single("image"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:8081"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
