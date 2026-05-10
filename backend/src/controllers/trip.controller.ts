import { Response } from 'express';
import { Trip } from '../models/trip.model.js';
import { Group } from '../models/group.model.js';
import { AuthRequest } from '../middleware/auth.js';
import { generateItinerary } from '../services/gemini.service.js';
import { logger } from '../lib/logger.js';

export async function createTrip(req: AuthRequest, res: Response) {
  try {
    const { groupId, destination, startDate, endDate, budget, interests, headcount } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const trip = await Trip.create({
      groupId,
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget,
      interests: interests || [],
      headcount,
    });

    res.status(201).json({ trip });
  } catch (error) {
    logger.error('Create trip error:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
}

export async function generateAiPlan(req: AuthRequest, res: Response) {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const days = Math.ceil(
      (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    const prompt = `Create a ${days}-day group itinerary for ${trip.destination}. 
Group size: ${trip.headcount} people. 
Total budget: $${trip.budget}. 
Interests: ${(trip.interests || []).join(', ') || 'general tourism'}.
Dates: ${new Date(trip.startDate).toLocaleDateString()} to ${new Date(trip.endDate).toLocaleDateString()}.
Include day-wise breakdown with activities, timings, costs, and total.`;

    trip.aiPrompt = prompt;
    const aiPlanJson = await generateItinerary(prompt);
    trip.aiPlanJson = aiPlanJson;
    await trip.save();

    res.json({ trip });
  } catch (error) {
    logger.error('Generate AI plan error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
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
