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
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new AiError(`Model ${model} failed: ${response.status} ${body}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    return text.trim();
}

function safeParseJson(raw: string): any {
  const cleaned = raw.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {}
    }
    logger.error('Failed to parse AI response as JSON', { raw: raw.slice(0, 500) });
    throw new AiError('AI response was not valid JSON');
  }
}

async function tryModels(systemPrompt: string, userPrompt: string): Promise<string> {
  const errors: string[] = [];

  for (const model of config.models) {
    try {
      logger.info('Calling AI model', { model });
      const result = await callModel(model, systemPrompt, userPrompt);
      if (result) {
        logger.info('AI model succeeded', { model });
        return result;
      }
      errors.push(`${model}: empty response`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${model}: ${msg}`);
      logger.warn(`Model failed`, { model, error: msg });
    }
  }

  throw new AiError(`All AI models failed:\n${errors.join('\n')}`);
}

const QUESTIONS_SYSTEM_PROMPT = `You are a smart travel planning assistant. Generate 8-10 questions to plan a group trip. Respond with ONLY a valid JSON array of strings. No other text. No markdown.`;

const QUESTIONS_USER_PROMPT = `Generate 8-10 questions to plan a group trip. Cover these topics:
1. Departure city
2. Destination & travel dates
3. Budget & number of travelers
4. Trip purpose & interests
5. Dietary restrictions
6. Accommodation preference
7. Transportation preference
8. Must-visit attractions
9. Pace preference (packed vs relaxed)
10. Any other preferences

Respond with ONLY valid JSON:
["Question 1?", "Question 2?", ..., "Question 10?"]`;

export async function generateQuestions(): Promise<Array<{ question: string }>> {
  const text = await tryModels(QUESTIONS_SYSTEM_PROMPT, QUESTIONS_USER_PROMPT);
  if (!text) throw new AiError('Empty response from all models for questions');
  const parsed = safeParseJson(text);
  return (parsed || []).map((q: string) => ({ question: q }));
}

export async function generateFinalItinerary(answers: Array<{ question: string; answer: string }>): Promise<any> {
  const qaContext = answers.filter((q) => q.answer)
    .map((q) => `Q: ${q.question}\nA: ${q.answer}`)
    .join('\n\n');

  const systemPrompt = `You are a travel itinerary planner. Generate a detailed itinerary in JSON format only.`;

  const userPrompt = `Create a group trip itinerary based on these preferences:

${qaContext || 'No specific preferences provided.'}

Day 1 must start with "Departure" (travel from origin). The last day must end with "Return Travel" (travel back).

Respond with valid JSON (no markdown):
{
  "days": [
    {
      "day": 1,
      "city": "city name",
      "activities": [
        { "time": "HH:MM", "activity": "Departure", "description": "Travel from origin", "cost": 0, "category": "transport" },
        { "time": "HH:MM", "activity": "name", "description": "desc", "cost": 0, "category": "food|transport|attraction|shopping|other" }
      ]
    }
  ],
  "totalCost": 0,
  "currency": "USD",
  "budgetBreakdown": { "accommodation": 0, "food": 0, "transport": 0, "activities": 0, "other": 0 },
  "recommendations": { "hotel": "name", "restaurants": ["r1","r2"], "transportTips": "tip" },
  "notes": "note"
}`;

  const text = await tryModels(systemPrompt, userPrompt);
  if (!text) throw new AiError('Empty response from all models for itinerary');
  return safeParseJson(text);
}

export async function regenerateDay(currentDays: any[], dayNumber: number, instruction: string): Promise<any> {
  const systemPrompt = `You are a travel planner. Regenerate a single day of an itinerary. Return JSON only.`;

  const userPrompt = `Current itinerary:\n${JSON.stringify(currentDays)}\n\nRegenerate Day ${dayNumber}: "${instruction}"\n\nReturn:
{
  "day": ${dayNumber},
  "city": "city",
  "activities": [
    { "time": "HH:MM", "activity": "name", "description": "desc", "cost": 0, "category": "food|transport|attraction|shopping|other" }
  ]
}`;

  const text = await tryModels(systemPrompt, userPrompt);
  if (!text) return null;
  return safeParseJson(text);
}
