import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/api', routes);

export default app;
