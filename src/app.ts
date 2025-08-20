import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use(express.json());
connectDB();
app.use("/", urlRoutes);

export default app;
