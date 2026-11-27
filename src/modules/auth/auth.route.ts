import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// Create New User
router.post("/signup", authController.signUpUser);

export const authRoute = router;
