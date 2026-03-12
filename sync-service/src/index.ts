import express from 'express';
import dotenv from 'dotenv';
import { cmsToMedusaRouter } from './routes/cms-to-medusa';
import { medusaToCmsRouter } from './routes/medusa-to-cms';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sync-service' });
});

// Routes
app.use('/sync/cms-to-medusa', cmsToMedusaRouter);
app.use('/sync/medusa-to-cms', medusaToCmsRouter);

app.listen(port, () => {
  console.log(`Sync service listening on port ${port}`);
});
