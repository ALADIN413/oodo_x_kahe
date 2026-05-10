import { Router } from 'express';
import { signupSchema, loginSchema, validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { signup, login, getMe } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', authMiddleware, getMe);

export default router;
