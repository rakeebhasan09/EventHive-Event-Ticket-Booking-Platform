import type { IEvent } from "./event.interface";
import { eventRepository } from "./event.repository";

const createEventIntoDB = async (payload: IEvent, organizer_id: number) => {
    payload.available_seats = payload.total_seats;
    payload.organizer_id = organizer_id;

    const result = await eventRepository.eventCreateQuery(payload);
    return result;
};

export const eventService = { createEventIntoDB };
