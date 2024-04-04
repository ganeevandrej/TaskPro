import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});