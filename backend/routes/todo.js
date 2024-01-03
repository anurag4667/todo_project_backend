import express from "express";
import { createtodo, edittodo } from "../controllers/todo.js";
import authentication from "../middlewares/auth.js";

const router = express.Router();

router.route("/addtodo").post(authentication,createtodo);
router.route("/edittodo/:id").put(authentication,edittodo);

export default router;
