import express from "express";
import {createAdminUser, createNormalUser, login, logoutUser} from "../controllers/user.controller.js"
import {  verifyAdmin,verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createNormalUser);
// considering one admin user is already created and we will allow to create admin if the creator is admin
router.post("/create-admin", verifyAdmin,  createAdminUser);

router.post("/login", login);
router.post("/logout", verifyJWT, logoutUser);

export default router;