import { Router } from 'express';
import { syncProductToMedusa } from '../services/sync-service';

export const cmsToMedusaRouter = Router();

// Verify webhook secret
const verifyWebhookSecret = (req: any, res: any, next: any) => {
  const secret = req.headers['x-payload-secret'];
  if (secret !== process.env.PAYLOAD_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

cmsToMedusaRouter.post('/', verifyWebhookSecret, async (req, res) => {
  try {
    const { operation, doc, collection } = req.body;

    if (collection !== 'products') {
      return res.json({ message: 'Not a product, skipping sync' });
    }

    console.log(`Syncing ${operation} for product: ${doc.title}`);

    const result = await syncProductToMedusa(doc, operation);

    res.json({
      success: true,
      message: `Product ${operation} synced successfully`,
      result,
    });
  } catch (error: any) {
    console.error('Sync error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
