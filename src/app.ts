import express from 'express';
import connectDB from './config/db';
import urlRoutes from './routes/urlRoutes';

const app = express();

app.use(express.json());
connectDB();
app.use('/', urlRoutes);

export default app;