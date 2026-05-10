import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../lib/config.js';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], config.jwtSecret) as { userId: string };
    req.user = { id: decoded.userId };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
