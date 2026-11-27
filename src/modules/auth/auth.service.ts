import type { IUser } from "./auth.interface";
import { authRepository } from "./auth.repository";

const createUserIntoDB = async (payload: IUser) => {
    const result = await authRepository.createUserQuery(payload);

    // Delete Password field from the response
    delete result.rows[0].password;

    return result.rows[0];
};

export const authService = { createUserIntoDB };
