import Router from "express";
import {registration, login} from "../controllers/auth.controller.js";

const router = new Router();

router.post("/registration", registration);
router.post("/login", login);

export default router;