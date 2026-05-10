import mongoose from 'mongoose';
import { config } from '../lib/config.js';
import { logger } from '../lib/logger.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUrl);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    logger.warn('Server will start without database - some features will be unavailable');
  }
}
