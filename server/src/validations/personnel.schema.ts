import { z } from "zod";

export const personnelSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    role: z.string().min(2, "Role is required"),
    experienceLevel: z.enum(["Junior", "Mid-Level", "Senior"]),
});