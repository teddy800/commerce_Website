import { Router } from 'express';
import { syncInventoryToCms } from '../services/sync-service';

export const medusaToCmsRouter = Router();

// Verify webhook secret
const verifyWebhookSecret = (req: any, res: any, next: any) => {
  const secret = req.headers['x-medusa-secret'];
  if (secret !== process.env.MEDUSA_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

medusaToCmsRouter.post('/', verifyWebhookSecret, async (req, res) => {
  try {
    const { event, data } = req.body;

    console.log(`Received Medusa event: ${event}`);

    if (event === 'product.updated' || event === 'product-variant.updated') {
      const result = await syncInventoryToCms(data);
      
      res.json({
        success: true,
        message: 'Inventory synced to CMS',
        result,
      });
    } else {
      res.json({ message: 'Event not handled' });
    }
  } catch (error: any) {
    console.error('Sync error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
