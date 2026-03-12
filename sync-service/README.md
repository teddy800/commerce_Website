# Sync Service - Card Game Store

Bidirectional sync service that keeps Payload CMS and Medusa.js in sync.

## Features

- CMS → Medusa product sync
- Medusa → CMS inventory sync
- Conflict resolution
- Retry logic with exponential backoff
- Comprehensive logging
- Webhook support

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables
PAYLOAD_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
```

### Development

```bash
npm run dev
```

Service runs on http://localhost:3002

### Build

```bash
npm run build
npm start
```

## API Endpoints

### Webhooks

#### Payload CMS Webhook
```
POST /webhooks/payload
```

Receives product updates from Payload CMS and syncs to Medusa.

#### Medusa Webhook
```
POST /webhooks/medusa
```

Receives inventory updates from Medusa and syncs to Payload CMS.

### Manual Sync

#### Sync All Products
```
POST /sync/products
```

Manually trigger sync of all products from CMS to Medusa.

#### Sync Inventory
```
POST /sync/inventory
```

Manually trigger sync of inventory from Medusa to CMS.

## Sync Logic

### CMS → Medusa (Product Sync)

1. Receive webhook from Payload CMS
2. Extract product data
3. Transform to Medusa format
4. Create or update product in Medusa
5. Store Medusa product ID in CMS
6. Log sync operation

### Medusa → CMS (Inventory Sync)

1. Receive webhook from Medusa
2. Extract inventory data
3. Find corresponding CMS product
4. Update inventory in CMS
5. Log sync operation

## Conflict Resolution

- **CMS is source of truth for**: Title, description, images, pricing
- **Medusa is source of truth for**: Inventory, variants, SKUs
- **Timestamp-based resolution**: Latest update wins

## Error Handling

- Retry failed syncs with exponential backoff
- Max 3 retries (1s, 2s, 4s)
- Log all errors for debugging
- Send alerts on critical failures

## Environment Variables

```
NODE_ENV=development
PORT=3002
PAYLOAD_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
PAYLOAD_WEBHOOK_SECRET=your-payload-secret
MEDUSA_WEBHOOK_SECRET=your-medusa-secret
```

## Deployment

### Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## Monitoring

- Check logs for sync operations
- Monitor webhook delivery
- Track sync success/failure rates
- Alert on critical errors

## License

MIT
