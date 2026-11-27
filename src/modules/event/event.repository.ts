import { pool } from "../../config/db";
import type { IEvent } from "./event.interface";

const eventCreateQuery = async (payload: IEvent) => {
    const {
        title,
        description,
        category,
        date,
        location,
        total_seats,
        available_seats,
        price,
        organizer_id,
    } = payload;

    const result = await pool.query(
        `
            INSERT INTO events (title, description, category, date, location, total_seats, available_seats, price, organizer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `,
        [
            title,
            description,
            category,
            date,
            location,
            total_seats,
            available_seats,
            price,
            organizer_id,
        ],
    );

    return result;
};

export const eventRepository = { eventCreateQuery };
