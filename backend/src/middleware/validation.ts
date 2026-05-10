import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createGroupSchema = z.object({
  name: z.string().min(1).max(100),
});

export const joinGroupSchema = z.object({
  inviteCode: z.string().min(1).max(20),
});

export const createTripSchema = z.object({
  groupId: z.string(),
  destination: z.string().min(1).max(200),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().min(0),
  interests: z.array(z.string()).optional().default([]),
  headcount: z.number().min(1),
  tripType: z.string().optional(),
  constraints: z.object({
    vegetarian: z.boolean().optional(),
    kids: z.boolean().optional(),
    seniors: z.boolean().optional(),
    luxury: z.boolean().optional(),
    publicTransport: z.boolean().optional(),
  }).optional(),
});

export const generateQuestionsSchema = z.object({
  tripId: z.string(),
});

export const submitAnswersSchema = z.object({
  tripId: z.string(),
  answers: z.array(z.string()),
});

export const regenerateDaySchema = z.object({
  tripId: z.string(),
  dayNumber: z.number(),
  instruction: z.string().min(1),
});

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: 'Validation failed', details: result.error.issues });
    }
    req.body = result.data;
    next();
  };
}
