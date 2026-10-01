import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  getCurrentUser,
  logoutUser,
} from "../../controllers/auth.controller.js";
import { cookieTokenAuth } from "../../middlewares/jwt/jwtToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

// Cookie must be present + valid JWT. Browser sends it automatically
// because frontend uses axios withCredentials: true.
router.get("/me", cookieTokenAuth, getCurrentUser);
router.post("/logout", logoutUser);

export default router;
