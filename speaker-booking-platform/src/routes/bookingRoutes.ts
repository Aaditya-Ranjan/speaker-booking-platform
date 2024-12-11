import express from 'express';
import { bookSession } from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/book', authenticate, bookSession);

export default router;
