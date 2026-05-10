import { config } from '../lib/config.js';
import { logger } from '../lib/logger.js';

interface ItineraryDay {
  day: number;
  city: string;
  activities: Array<{
    time: string;
    activity: string;
    description: string;
    cost: number;
    category: string;
  }>;
}

interface Itinerary {
  days: ItineraryDay[];
  totalCost: number;
  currency: string;
  notes: string;
}

export async function generateItinerary(prompt: string): Promise<Itinerary> {
  if (!config.geminiApiKey) {
    logger.warn('No GEMINI_API_KEY configured, using fallback itinerary');
    return getFallbackItinerary();
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a travel planner. Generate a detailed itinerary in JSON format only. No markdown, no code fences, just raw JSON.

${prompt}

Respond with valid JSON following this exact structure:
{
  "days": [
    {
      "day": <number>,
      "city": "<city name>",
      "activities": [
        {
          "time": "<HH:MM>",
          "activity": "<short name>",
          "description": "<brief description>",
          "cost": <number>,
          "category": "food|transport|attraction|shopping|other"
        }
      ]
    }
  ],
  "totalCost": <number>,
  "currency": "USD",
  "notes": "<helpful note>"
}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!response.ok) {
      logger.error('Gemini API returned error', { status: response.status });
      return getFallbackItinerary();
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const cleaned = text
      .replace(/```json\n?/gi, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    logger.error('Gemini API error:', error);
    return getFallbackItinerary();
  }
}

function getFallbackItinerary(): Itinerary {
  return {
    days: [
      {
        day: 1,
        city: "Destination",
        activities: [
          { time: "10:00", activity: "Arrival & Check-in", description: "Arrive at destination and check into accommodation", cost: 0, category: "other" },
          { time: "12:30", activity: "Welcome Lunch", description: "Group lunch at a local restaurant to kick off the trip", cost: 25, category: "food" },
          { time: "14:00", activity: "City Orientation Walk", description: "Guided walking tour of main attractions and landmarks", cost: 0, category: "attraction" },
          { time: "19:00", activity: "Group Dinner", description: "Dinner at a highly-rated local restaurant", cost: 35, category: "food" },
        ],
      },
      {
        day: 2,
        city: "Destination",
        activities: [
          { time: "08:00", activity: "Breakfast", description: "Breakfast at hotel", cost: 12, category: "food" },
          { time: "09:00", activity: "Adventure Activity", description: "Outdoor adventure experience (hiking, water sports, etc.)", cost: 75, category: "attraction" },
          { time: "12:30", activity: "Lunch Break", description: "Casual lunch near the activity spot", cost: 18, category: "food" },
          { time: "14:00", activity: "Cultural Visit", description: "Visit museum, gallery, or historical site", cost: 20, category: "attraction" },
          { time: "17:00", activity: "Shopping & Exploration", description: "Explore local markets and shops", cost: 45, category: "shopping" },
          { time: "20:00", activity: "Nightlife Experience", description: "Experience local nightlife or evening entertainment", cost: 40, category: "other" },
        ],
      },
      {
        day: 3,
        city: "Destination",
        activities: [
          { time: "09:00", activity: "Leisurely Brunch", description: "Enjoy a relaxed brunch at a popular cafe", cost: 20, category: "food" },
          { time: "11:00", activity: "Final Sightseeing", description: "Visit any remaining must-see attractions", cost: 15, category: "attraction" },
          { time: "14:00", activity: "Departure", description: "Check out and transfer to airport/station", cost: 30, category: "transport" },
        ],
      },
    ],
    totalCost: 350,
    currency: "USD",
    notes: "This is a sample itinerary generated as a fallback. Costs are estimates per person. Book activities in advance for best prices.",
  };
}
