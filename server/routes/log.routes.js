
import express from "express";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { logAction } from "../middlewares/log.middleware.js";
import { getLogs, deleteLog } from "../controllers/log.controller.js";

const router = express.Router();

router.get("/getlog", verifyJWT, getLogs);
router.put("/deletelog/:logId", verifyJWT, deleteLog);

export default router;
