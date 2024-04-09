import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});