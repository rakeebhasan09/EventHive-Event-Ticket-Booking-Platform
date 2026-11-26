import express, {
    type Application,
    type Request,
    type Response,
} from "express";
import cors from "cors";

const app: Application = express();

// Middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message:
            "Yah! EventHive Event Ticket Booking Platform Server is running and this is root route...",
        author: "MD Rakeeb Hasan",
    });
});

export default app;
