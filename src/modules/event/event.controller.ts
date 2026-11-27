import type { Request, Response } from "express";
import { eventService } from "./event.service";

const createEvent = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const organizer_id = user?.id;
        const result = await eventService.createEventIntoDB(
            req.body,
            organizer_id,
        );

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: result.rows[0],
        });

        console.log("Result from event controller:", result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message || "internal server error!",
        });
    }
};

export const eventController = { createEvent };
