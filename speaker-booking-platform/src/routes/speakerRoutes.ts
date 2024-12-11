import express from 'express';
import { addSpeakerDetails } from '../controllers/speakerController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/profile', authenticate, authorize(['speaker']), addSpeakerDetails);

export default router;
