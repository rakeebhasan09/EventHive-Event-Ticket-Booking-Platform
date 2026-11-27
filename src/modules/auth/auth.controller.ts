import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.createUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(error.statusCode).json({
            success: false,
            message: error?.message,
        });
    }
};

export const authController = { signUpUser };
