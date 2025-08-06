import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes';

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use('/', urlRoutes);

export default app;