import dotenv from 'dotenv';
dotenv.config();

const rawModels = [
  process.env.DEFAULT_MODEL,
  process.env.FALLBACK_MODEL,
  process.env.HEAVY_MODEL,
].filter(Boolean) as string[];

const configuredModels = [...new Set(rawModels)];

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/traveloop',
  jwtSecret: process.env.JWT_SECRET || 'dev-fallback-secret',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
  openrouterBaseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  models: configuredModels.length > 0 ? configuredModels : ['google/gemini-2.0-flash-001'],
  nodeEnv: process.env.NODE_ENV || 'development',
};
