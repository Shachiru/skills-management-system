import dotenv from "dotenv";
import express from "express";
import type {Request, Response} from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.send('Skills Management System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});