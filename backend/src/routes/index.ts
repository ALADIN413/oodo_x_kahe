import { Router } from 'express';
import authRoutes from './auth.js';
import groupRoutes from './groups.js';
import tripRoutes from './trips.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/trips', tripRoutes);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
