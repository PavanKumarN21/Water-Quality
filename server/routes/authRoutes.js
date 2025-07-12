import express from "express";
import {
  register,
  login,
  logout,
  changePassword,
  getUserDetails,
  updateProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/change-password", authMiddleware, changePassword);
authRouter.get("/profile", authMiddleware, getUserDetails);
authRouter.put("/update-profile", authMiddleware, updateProfile);

export default authRouter;
