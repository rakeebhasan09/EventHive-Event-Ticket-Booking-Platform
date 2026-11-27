export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role?: "attendee" | "organizer";
    created_at: Date;
    updated_at: Date;
}
