import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { createTrip, submitAnswers, regenerateDayForTrip, getTripsByGroup, generateQuestionsOnly } from '../controllers/trip.controller.js';

const createTripSchema = z.object({
  groupId: z.string(),
  questions: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
});

const submitAnswersSchema = z.object({
  tripId: z.string(),
  answers: z.array(z.string()),
});

const regenerateDaySchema = z.object({
  tripId: z.string(),
  dayNumber: z.number(),
  instruction: z.string().min(1),
});

const router = Router();

router.post('/questions/generate', authMiddleware, generateQuestionsOnly);
router.post('/create', authMiddleware, validate(createTripSchema), createTrip);
router.post('/submit-answers', authMiddleware, validate(submitAnswersSchema), submitAnswers);
router.post('/regenerate-day', authMiddleware, validate(regenerateDaySchema), regenerateDayForTrip);
router.get('/:groupId', authMiddleware, getTripsByGroup);

export default router;
