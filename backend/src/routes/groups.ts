import { Router } from 'express';
import { createGroupSchema, joinGroupSchema, validate } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';
import { createGroup, joinGroup, getGroup, getUserGroups } from '../controllers/group.controller.js';

const router = Router();

router.post('/create', authMiddleware, validate(createGroupSchema), createGroup);
router.post('/join', authMiddleware, validate(joinGroupSchema), joinGroup);
router.get('/my', authMiddleware, getUserGroups);
router.get('/:id', authMiddleware, getGroup);

export default router;
