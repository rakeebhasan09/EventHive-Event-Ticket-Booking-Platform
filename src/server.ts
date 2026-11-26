import app from "./app";
import { initDB } from "./config/db";
import config from "./config/env";

const startServer = async () => {
    initDB();
    app.listen(config.port, () => {
        console.log(
            `EventHive Event Ticket Booking Platform listening on port ${config.port}`,
        );
    });
};

startServer();
