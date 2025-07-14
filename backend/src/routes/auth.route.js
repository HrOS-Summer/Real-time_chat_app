import express from "express";
const router = express.Router();

import {checkAuth, login, logout, signup, updateProfile, deleteProfile, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", protectRoute, updateProfile) //protectRoute middleware 

router.get("/check", protectRoute, checkAuth);

router.delete("/delete-profile", protectRoute, deleteProfile);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;