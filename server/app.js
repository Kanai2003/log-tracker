import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN, "https://localhost:3000"],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

import userRouter from "./routes/user.routes.js";
import logRouter from "./routes/log.routes.js";

app.use("/user", userRouter);
app.use("/log", logRouter);


export {app};