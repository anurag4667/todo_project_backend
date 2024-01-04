import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import user from "./routes/user.js";
import todo from "./routes/todo.js";
import cors from "cors";
const app = express();

if(process.env.NODE_ENV !== "production"){
    dotenv.config({
        path: "backend/config/config.env"
    });
}

//using middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieparser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET",'POST','PUT','DELETE'],
    credentials : true,
}))

//routes
app.use("/api/v1",user);
app.use("/api/v1",todo);
export default app;