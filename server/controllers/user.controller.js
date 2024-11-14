import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { logAction } from "../middlewares/log.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createNormalUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
    }

    const user = new User({
        name,
        email,
        password,
        role: "user"
    });

    await user.save();

    await logAction("create-normal-user", user._id, "user", { "email": email });

    res.status(201).json({ message: "User created successfully" });
});

export const createAdminUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const user = new User.create({
        name,
        email,
        password,
        role: "admin"
    })

    if(!user){
        return res.status(400).json({message: "Failed to create user"})
    }

    await logAction("create-admin-user", user._id, "admin", {"email":email})

    res.status(201).json({message: "Admin user created successfully"})
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    await logAction("login",loggedInUser._id, loggedInUser.role, { "email": email });

    return res.status(200)
        .cookie("token", user.generateAuthToken(), { httpOnly: true })
        .json({ user: loggedInUser });
});

export const logoutUser = asyncHandler(async(req, res) => {
    await logAction("logout", req.user._id, req.user.role, {"email":req.user.email})

    res.clearCookie("token", { httpOnly: true})
    return res.status(200).json({message: "Logged out successfully"})

})