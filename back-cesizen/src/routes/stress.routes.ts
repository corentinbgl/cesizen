import { Router } from 'express';
import { getStressEvents, calculateScore, createStressEvent, deleteStressEvent } from '../controllers/stress.controller';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getStressEvents);
router.post('/calculate', calculateScore);
router.post('/admin/stress', authenticateToken, isAdmin, createStressEvent);
router.delete('/admin/stress/:eventId', authenticateToken, isAdmin, deleteStressEvent)

export default router;
