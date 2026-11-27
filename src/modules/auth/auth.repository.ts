import { pool } from "../../config/db";
import AppError from "../../utils/AppError";
import { passwordHelpers } from "../../utils/passwordHelpers";
import type { IUser } from "./auth.interface";

const createUserQuery = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    // Find User if already exists
    const userByEmail = await pool.query(
        `
            SELECT * FROM users WHERE email = $1
        `,
        [email],
    );
    if (userByEmail.rowCount !== 0) {
        throw new AppError("email already registered", 409);
    }

    // Hashed Password
    const hashedPassword = await passwordHelpers.hashPassword(password);

    // Database Insert Query
    const result = await pool.query(
        `
            INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, 'attendee')) RETURNING *
        `,
        [name, email, hashedPassword, role],
    );

    return result;
};

export const authRepository = { createUserQuery };
