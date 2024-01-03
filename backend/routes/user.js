import express from "express";
import { login, logout, register } from "../controllers/user.js";
import authentication from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authentication,logout);

export default router;
