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
    requirements: z.array(
        z.object({
            skillId: z.number(),
            minProficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
        })
    ).min(1, "At least one skill requirement is needed")
});