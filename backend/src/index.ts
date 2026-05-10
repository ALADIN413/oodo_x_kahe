import app from './app.js';
import { connectDB } from './db/mongo.js';
import { config } from './lib/config.js';
import { logger } from './lib/logger.js';

async function start() {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`Traveloop API running on port ${config.port}`);
  });
}

start().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
