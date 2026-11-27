import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// Create New User
router.post("/signup", authController.signUpUser);

// Login User
router.post("/login", authController.loginUser);

export const authRoute = router;
