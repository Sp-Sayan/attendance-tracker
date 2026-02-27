import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/checkAuth", protectRoute, checkAuth);


export default router;