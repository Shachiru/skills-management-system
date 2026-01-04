import {z} from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(3, "Project name is too short"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date",
    }),
    status: z.enum(['Planning', 'Active', 'Completed']).optional(),
    requirements: z.array(
        z.object({
            skillId: z.number(),
            minProficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
        })
    ).optional()
}).refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end > start;
}, {
    message: "End date must be after start date",
    path: ["endDate"]
});