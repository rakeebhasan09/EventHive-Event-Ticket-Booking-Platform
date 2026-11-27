import type { NextFunction, Request, Response } from "express";
import type { Role } from "../type";
import { pool } from "../config/db";
import config from "../config/env";
import jwt, { type JwtPayload } from "jsonwebtoken";

const authMiddleware = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization token is required!",
                });
            }

            // Extract token and check Token
            const token = authHeader?.replace(/^Bearer\s*/i, "").trim();

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Missing/Invalid token!",
                });
            }

            const decode = jwt.verify(
                token as string,
                config.jwt_secret,
            ) as JwtPayload;

            const result = await pool.query(
                `
                SELECT * FROM users WHERE email = $1
            `,
                [decode.email],
            );

            if (result.rowCount === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Missing/Invalid token!",
                });
            }

            if (roles.length && !roles.includes(result.rows[0].role)) {
                return res.status(403).json({
                    success: false,
                    message: "caller is not an organizer",
                });
            }

            req.user = decode;

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default authMiddleware;
