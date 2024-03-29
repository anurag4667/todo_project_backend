import express from "express";
import { createtodo, deletetodo, edittodo, getmytodos } from "../controllers/todo.js";
import authentication from "../middlewares/auth.js";

const router = express.Router();

router.route("/addtodo").post(authentication,createtodo);
router.route("/edittodo/:id").put(authentication,edittodo);
router.route("/deletetodo/:id").delete(authentication,deletetodo);
router.route("/todos/me").get(authentication,getmytodos);

export default router;
