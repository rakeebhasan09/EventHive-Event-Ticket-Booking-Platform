import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import { authRoute } from "./modules/auth/auth.route";
import { eventRouter } from "./modules/event/event.route";
// import cors from "cors";

const app: Application = express();

// Middlewares
app.use(express.json());

// Auth Routes
app.use("/api/v1/auth", authRoute);

// Event Router
app.use("/api/v1/events", eventRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message:
            "Yah! EventHive Event Ticket Booking Platform Server is running and this is root route...",
        author: "MD Rakeeb Hasan",
    });
});

export default app;
