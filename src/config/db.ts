import { Pool } from "pg";
import config from "./env";

export const pool = new Pool({
    connectionString: config.connection_string,
});

export const initDB = async () => {
    try {
        await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(100) CHECK (role IN ('attendee', 'organizer')) DEFAULT 'attendee',

                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                );
            `);

        await pool.query(`
                CREATE TABLE IF NOT EXISTS events(
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    category VARCHAR(150) NOT NULL,
                    date VARCHAR(150) NOT NULL,
                    location VARCHAR(150) NOT NULL,
                    total_seats INT NOT NULL,
                    available_seats INT NOT NULL,
                    price INT NOT NULL,
                    organizer_id INT NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                )
            `);
    } catch (error) {
        console.log(error);
    }
};
