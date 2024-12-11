import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import speakerRoutes from './routes/speakerRoutes';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/bookings', bookingRoutes);

export default app;
