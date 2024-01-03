import express from "express";
import { createtodo } from "../controllers/todo.js";
import authentication from "../middlewares/auth.js";

const router = express.Router();

router.route("/addtodo").post(authentication,createtodo);

export default router;
