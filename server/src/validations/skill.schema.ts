import { z } from "zod";

export const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
});

export const assignSkillSchema = z.object({
    personnelId: z.number(),
    skillId: z.number(),
    proficiencyLevel: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});