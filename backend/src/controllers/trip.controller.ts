import { Response } from 'express';
import { Trip } from '../models/trip.model.js';
import { Group } from '../models/group.model.js';
import { AuthRequest } from '../middleware/auth.js';
import { generateQuestions, generateFinalItinerary, regenerateDay } from '../services/gemini.service.js';
import { logger } from '../lib/logger.js';

export async function createTrip(req: AuthRequest, res: Response) {
  try {
    const { groupId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const trip = await Trip.create({
      groupId,
      destination: 'Planning...',
      startDate: new Date(),
      endDate: new Date(),
      budget: 0,
      interests: [],
      headcount: 1,
    });

    const questions = await generateQuestions();
    trip.set('questions', questions.map((q: any) => ({ question: q.question, answer: '' })));
    await trip.save();

    res.status(201).json({ trip });
  } catch (error) {
    logger.error('Create trip error:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
}

export async function submitAnswers(req: AuthRequest, res: Response) {
  try {
    const { tripId, answers } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    trip.set('questions', (trip.questions || []).map((q: any, i: number) => ({
      question: q.question,
      answer: answers[i] || '',
    })));
    await trip.save();

    const aiPlanJson = await generateFinalItinerary(
      (trip.questions || []).map((q: any) => ({ question: q.question || '', answer: q.answer || '' }))
    );
    trip.aiPlanJson = aiPlanJson;
    await trip.save();

    res.json({ trip });
  } catch (error) {
    logger.error('Submit answers error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
}

export async function regenerateDayForTrip(req: AuthRequest, res: Response) {
  try {
    const { tripId, dayNumber, instruction } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (!trip.aiPlanJson?.days) return res.status(400).json({ error: 'No itinerary to modify' });

    const newDay = await regenerateDay(trip.aiPlanJson.days, dayNumber, instruction);
    if (!newDay) return res.status(500).json({ error: 'Failed to regenerate day' });

    const days = trip.aiPlanJson.days.map((d: any) =>
      d.day === dayNumber ? { ...d, ...newDay } : d
    );
    trip.aiPlanJson.days = days;
    await trip.save();

    res.json({ trip });
  } catch (error) {
    logger.error('Regenerate day error:', error);
    res.status(500).json({ error: 'Failed to regenerate day' });
  }
}

export async function getTripsByGroup(req: AuthRequest, res: Response) {
  try {
    const trips = await Trip.find({ groupId: req.params.groupId }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
}
