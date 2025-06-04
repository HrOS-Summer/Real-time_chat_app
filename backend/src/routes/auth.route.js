import express from "express";
const router = express.Router();

import {login, logout, signup, updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", protectRoute, updateProfile) //protectRoute middleware 

export default router;