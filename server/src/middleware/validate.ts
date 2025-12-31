import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { ZodError } from "zod";

export const validate = (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: "Validation Failed",
                    errors: error.issues.map((err: ZodError["issues"][0]) => ({
                        field: err.path[0],
                        message: err.message
                    }))
                });
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };