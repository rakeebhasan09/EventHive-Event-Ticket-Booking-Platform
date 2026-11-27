import { Router } from "express";
import { eventController } from "./event.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { USER_ROLE } from "../../type";

const router = Router();

// Create a new event
router.post(
    "/",
    authMiddleware(USER_ROLE.organizer),
    eventController.createEvent,
);

export const eventRouter = router;
