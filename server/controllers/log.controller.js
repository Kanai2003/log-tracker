import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Log } from "../models/log.model.js";
import { logAction } from "../middlewares/log.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUserDetailsAndLogs = async (adminEmail) => {
  if (!adminEmail) {
    return res.status(400).json({ message: "Admin email is required" });
  }
  const admin = await User.findOne({ email: adminEmail });

  if (admin.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const users = await User.find({}).select("-password");

  // console.log("User :: ",users);


  let response = {};

  for (const user of users) {
    if (user.email === adminEmail) {
      continue;
    }

    const logs = await Log.find({ userId: user._id });

    response[user.email] = {
      userDetails: user,
      logs: logs,
    };
  }

  // console.log("All users Response :: ",response);

  return response;
};

const getUserDetailsAndLogs = async (userEmail) => {
  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }

  let response = {};

  response["userDetails"] = await User.findOne({ email: userEmail }).select(
    "-password"
  );
  response["logs"] = await Log.find({ userId: response["userDetails"]._id });

  // console.log("User details and logs :: ",response);
  return response;
};

export const getLogs = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

    let response;

    if (user.role === "admin") {
      const adminDetails = await getUserDetailsAndLogs(user.email);
      console.log("Admin details:", adminDetails);

      const allUserDetailsAndLogs = await getAllUserDetailsAndLogs(user.email);
      console.log("All user details and logs:", allUserDetailsAndLogs);


      await logAction("get-logs", user._id, user.role, { email: user.email });
      response = {
        adminDetailsAndLogs: adminDetails,
        allUserDetailsAndLogs: allUserDetailsAndLogs,
      };
    } else {
      response = await getUserDetailsAndLogs(user.email);

      // Only return non-deleted logs for regular users
      response.logs = response.logs.filter((log) => !log.isDeleted);
      await logAction("get-logs", user._id, user.role, { email: user.email });
    }

    return res.status(200).json(response);
  
});


export const deleteLog = asyncHandler(async (req, res) => {
  const { user } = req;
  const { logId } = req.params;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const log = user.role === "admin"
    ? await Log.findById(logId)
    : await Log.findOne({ _id: logId, userId: user._id, isDeleted: false });

  if (!log) {
    return res.status(404).json({ message: "Log not found" });
  }

  log.isDeleted = true;
  await log.save();

  await logAction(user.role === "admin" ? "log-deleted-by-admin" : "log-deleted", user._id, user.role, {
    email: user.email,
    logId: logId,
  });

  return res.status(200).json({ message: "Log deleted successfully" });
});
