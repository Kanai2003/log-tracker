import { Log } from "../models/log.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const logAction = asyncHandler(async ( actionType, userId, role, additionalData = {}) => {
    const log = await Log.create({
        actionType,
        userId: userId,
        role: role || "user",
        additionalData
    });

    if (!log) {
        return res.status(400).json({ message: "Failed to log action" });
    }

});