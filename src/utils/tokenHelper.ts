import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/env";

const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, config.jwt_secret, { expiresIn: "7d" });
};

export const tokenHelper = { generateToken };
