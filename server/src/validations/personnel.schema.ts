import {z} from "zod";

export const personnelSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    role: z.string().min(2, "Role is required"),
    experienceLevel: z.enum(["Junior", "Mid-Level", "Senior"], {
        message: "Experience level must be Junior, Mid-Level, or Senior"
    }),
    isAvailable: z.boolean().optional()
});