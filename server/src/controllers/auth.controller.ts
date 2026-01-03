import type {Request, Response} from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, role });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token, role: user.role });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verify = async (req: Request, res: Response) => {
    try {
        // The auth middleware has already verified the token
        // and attached the user to req.user
        const userId = (req as any).user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json({
            email: user.email,
            role: user.role,
            id: user.id
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
