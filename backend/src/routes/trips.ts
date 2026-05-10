import { Router } from 'express';
import { createTripSchema, generateAiPlanSchema, validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { createTrip, generateAiPlan, getTripsByGroup } from '../controllers/trip.controller.js';

const router = Router();

router.post('/create', authMiddleware, validate(createTripSchema), createTrip);
router.post('/generate-ai-plan', authMiddleware, validate(generateAiPlanSchema), generateAiPlan);
router.get('/:groupId', authMiddleware, getTripsByGroup);

export default router;
