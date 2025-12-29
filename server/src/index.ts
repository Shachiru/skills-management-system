import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import type {Request, Response} from "express";
import cors from "cors";
import {initDB} from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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