import { config } from '../lib/config.js';
import { logger } from '../lib/logger.js';

class AiError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'AiError';
  }
}

async function callModel(model: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const url = `${config.openrouterBaseUrl}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openrouterApiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new AiError(`Model ${model} failed: ${response.status} ${body}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';
  return text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
}

async function tryModels(systemPrompt: string, userPrompt: string): Promise<string> {
  const errors: string[] = [];

  for (const model of config.models) {
    try {
      const result = await callModel(model, systemPrompt, userPrompt);
      if (result) return result;
      errors.push(`${model}: empty response`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${model}: ${msg}`);
      logger.warn(`Model failed, trying next`, { model, error: msg });
    }
  }

  throw new AiError(`All AI models failed:\n${errors.join('\n')}`);
}

const QUESTIONS_SYSTEM_PROMPT = `You are a smart travel planning assistant. Your job is to ask ALL necessary questions to plan a complete group trip from scratch. Respond with ONLY a valid JSON array of 10-15 questions. No other text. No markdown.`;

const QUESTIONS_USER_PROMPT = `Generate 10-15 comprehensive questions to plan a group trip from scratch. Cover ALL these topics:
1. Destination & travel dates
2. Total budget and currency
3. Number of travelers and their ages
4. Trip purpose (adventure, relaxation, cultural, family, romantic, business)
5. Interests and activities preferred
6. Dietary restrictions (vegetarian, allergies, etc.)
7. Accommodation preferences (hotel, hostel, resort, Airbnb, luxury level)
8. Transportation preferences (flights, train, car rental, public transport)
9. Restaurant and dining preferences (budget, cuisine types)
10. Need travel agency assistance?
11. Need hotel booking assistance?
12. Need restaurant booking assistance?
13. Any specific must-visit attractions or places
14. Pace preference (sightseeing-heavy vs relaxed)
15. Nightlife and evening activity preferences

Each question should be conversational, specific, and helpful.

Respond with ONLY valid JSON:
["Question 1?", "Question 2?", ..., "Question 15?"]`;

export async function generateQuestions(): Promise<Array<{ question: string }>> {
  const text = await tryModels(QUESTIONS_SYSTEM_PROMPT, QUESTIONS_USER_PROMPT);
  if (!text) throw new AiError('Empty response from all models for questions');
  const parsed = JSON.parse(text);
  return (parsed || []).map((q: string) => ({ question: q }));
}

export async function generateFinalItinerary(answers: Array<{ question: string; answer: string }>): Promise<any> {
  const qaContext = answers.filter((q) => q.answer)
    .map((q) => `Q: ${q.question}\nA: ${q.answer}`)
    .join('\n\n');

  const systemPrompt = `You are a world-class travel itinerary planner. Generate detailed, practical itineraries in JSON format only.`;

  const userPrompt = `Create a complete group trip itinerary based on the following traveler preferences:

${qaContext || 'No specific preferences provided.'}

Respond with valid JSON following this EXACT structure (no markdown, no code fences):
{
  "days": [
    {
      "day": 1,
      "city": "city name",
      "activities": [
        {
          "time": "HH:MM",
          "activity": "short name",
          "description": "brief description",
          "cost": <number>,
          "category": "food|transport|attraction|shopping|other"
        }
      ]
    }
  ],
  "totalCost": <number>,
  "currency": "USD",
  "budgetBreakdown": {
    "accommodation": <number>,
    "food": <number>,
    "transport": <number>,
    "activities": <number>,
    "other": <number>
  },
  "recommendations": {
    "hotel": "recommended hotel name and reason",
    "restaurants": ["restaurant 1", "restaurant 2"],
    "transportTips": "transport tip"
  },
  "notes": "helpful note"
}`;

  const text = await tryModels(systemPrompt, userPrompt);
  if (!text) throw new AiError('Empty response from all models for itinerary');
  return JSON.parse(text);
}

export async function regenerateDay(currentDays: any[], dayNumber: number, instruction: string): Promise<any> {
  const systemPrompt = `You are a travel planner. Regenerate a single day of an itinerary. Respond with JSON only.`;

  const userPrompt = `Current full itinerary days:\n${JSON.stringify(currentDays)}\n\nRegenerate Day ${dayNumber} with this change: "${instruction}"\n\nReturn ONLY the updated day object matching this structure:
{
  "day": ${dayNumber},
  "city": "city",
  "activities": [
    { "time": "HH:MM", "activity": "name", "description": "desc", "cost": 0, "category": "food|transport|attraction|shopping|other" }
  ]
}`;

  const text = await tryModels(systemPrompt, userPrompt);
  if (!text) return null;
  return JSON.parse(text);
}
