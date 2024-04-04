import Router from "express";
import {getUsers} from "../controllers/user.controller.js";

const router = new Router();

router.get("/user", getUsers);

export default router;