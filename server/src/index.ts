import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import type {Request, Response} from "express";
import cors from "cors";
import {initDB} from "./config/db.js";
import personnelRoutes from "./routes/personnel.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import projectRoutes from "./routes/project.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import authRoutes from "./routes/auth.routes.js";
import {protect} from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/personnel", protect, personnelRoutes);
app.use("/api/skills", protect, skillRoutes);
app.use("/api/projects", protect, projectRoutes);
app.use("/api/analytics", protect, analyticsRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Personnel Skills Management System API is running...');
});

const startServer = async () => {
    try {
        await initDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`🔗 Local: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ server cannot start", error);
        process.exit(1);
    }
};

startServer();