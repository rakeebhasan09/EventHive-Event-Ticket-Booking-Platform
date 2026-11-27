import AppError from "../../utils/AppError";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { tokenHelper } from "../../utils/tokenHelper";
import type { IUser } from "./auth.interface";
import { authRepository } from "./auth.repository";

const createUserIntoDB = async (payload: IUser) => {
    const result = await authRepository.createUserQuery(payload);

    // Delete Password field from the response
    delete result.rows[0].password;

    return result.rows[0];
};

// Match User Credentials
const loginUserWithCredentials = async (email: string, password: string) => {
    const result = await authRepository.selectUserFromDB(email);

    // If no user found
    if (result.rowCount === 0) {
        throw new AppError("invalid email or password", 404);
    }

    // If found a user match user password
    const matchPassword = await passwordHelpers.compareHash(
        password,
        result.rows[0].password,
    );

    if (!matchPassword) {
        throw new AppError("invalid email or password", 401);
    }

    const jwtPayload = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
    };

    const token = tokenHelper.generateToken(jwtPayload);

    delete result.rows[0].password;
    delete result.rows[0].created_at;
    delete result.rows[0].updated_at;

    return { token, user: result.rows[0] };
};

export const authService = { createUserIntoDB, loginUserWithCredentials };
