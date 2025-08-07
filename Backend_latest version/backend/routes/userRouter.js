import express from "express";
import {
  getUser,
  getAllUsers,
  login,
  verifyEmail,
  logout,
  register,
  updatePassword,
  updateProfile,
  updateUserStatus,
  getStudentDetails,
  updateUserStatus1,
  saveToPlacedStudents,
  getAllPlaced,
  getUserLockStatus,
  updateUserStatusLock,
  forgotPassword,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.get('/verify-email/:token', verifyEmail);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getall", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.put("/placed/:id", updateUserStatus);
router.put("/locked/:id",isAuthenticated, isAuthorized("Admin"), updateUserStatusLock);
router.get("/getstudentdetails/:rollNumber", isAuthenticated, getStudentDetails);
router.put("/lockunlock/:id", isAuthenticated, isAuthorized("Admin"), updateUserStatus1);
router.post("/saveToPlacedStudents", isAuthenticated, isAuthorized("Admin"), saveToPlacedStudents);
router.get("/getallplaced", isAuthenticated, isAuthorized("Admin"), getAllPlaced);
router.get("/islocked/:id", isAuthenticated, getUserLockStatus);
router.post("/forgot-password", forgotPassword);

export default router;
