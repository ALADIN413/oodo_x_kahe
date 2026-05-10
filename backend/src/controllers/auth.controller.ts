import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateToken, AuthRequest } from '../middleware/auth.js';

export async function signup(req: AuthRequest, res: Response) {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
}

export async function login(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const token = generateToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.user!.id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}
