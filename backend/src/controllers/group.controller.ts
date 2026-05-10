import { Response } from 'express';
import crypto from 'crypto';
import { Group } from '../models/group.model.js';
import { AuthRequest } from '../middleware/auth.js';

export async function createGroup(req: AuthRequest, res: Response) {
  try {
    const { name } = req.body;
    const inviteCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const group = await Group.create({
      name,
      inviteCode,
      createdBy: req.user!.id,
      members: [req.user!.id],
    });
    const populated = await Group.findById(group._id).populate('members', '-passwordHash');
    res.status(201).json({ group: populated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
}

export async function joinGroup(req: AuthRequest, res: Response) {
  try {
    const { inviteCode } = req.body;
    const group = await Group.findOne({ inviteCode: inviteCode.toUpperCase() });
    if (!group) return res.status(404).json({ error: 'Invalid invite code' });

    const userId = req.user!.id;
    if (group.members.some((m) => m.toString() === userId)) {
      return res.status(400).json({ error: 'Already a member of this group' });
    }

    group.members.push(userId as any);
    await group.save();
    const populated = await Group.findById(group._id).populate('members', '-passwordHash');
    res.json({ group: populated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join group' });
  }
}

export async function getGroup(req: AuthRequest, res: Response) {
  try {
    const group = await Group.findById(req.params.id).populate('members', '-passwordHash');
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json({ group });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
}

export async function getUserGroups(req: AuthRequest, res: Response) {
  try {
    const groups = await Group.find({ members: req.user!.id })
      .populate('members', '-passwordHash')
      .sort({ createdAt: -1 });
    res.json({ groups });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
}
