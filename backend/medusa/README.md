# Medusa Backend - Card Game Store

Medusa.js backend for handling e-commerce operations including products, carts, orders, and payments.

## Features

- Product catalog management
- Shopping cart operations
- Order creation and management
- Customer authentication
- Payment processing (Stripe)
- Inventory tracking
- Webhook support for CMS sync

## Tech Stack

- **Framework**: Medusa.js
- **Database**: PostgreSQL
- **Cache**: Redis
- **Payment**: Stripe
- **Language**: TypeScript/JavaScript

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Redis 6+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
STRIPE_API_KEY=sk_test_your_key
```

### Database Setup

```bash
# Run migrations
npm run migrations

# Seed initial data
npm run seed
```

### Development

```bash
npm run dev
```

Server runs on http://localhost:9000

### Build

```bash
npm run build
npm start
```

## Project Structure

```
backend/medusa/
├── src/
│   ├── api/                 # API routes
│   ├── services/            # Business logic
│   ├── models/              # Database models
│   ├── subscribers/         # Event subscribers
│   └── migrations/          # Database migrations
├── data/
│   └── seed.json           # Seed data
├── medusa-config.js        # Configuration
└── package.json
```

## API Endpoints

### Products
- `GET /store/products` - List products
- `GET /store/products/:id` - Get product details

### Cart
- `POST /store/carts` - Create cart
- `GET /store/carts/:id` - Get cart
- `POST /store/carts/:id/line-items` - Add to cart
- `DELETE /store/carts/:id/line-items/:line_item_id` - Remove from cart

### Orders
- `POST /store/carts/:id/complete` - Complete order
- `GET /store/orders/:id` - Get order details

### Customers
- `POST /store/customers` - Register customer
- `POST /store/auth` - Login customer
- `GET /store/customers/me` - Get current customer

## Webhooks

### CMS Sync Webhooks

Listen for events from Payload CMS:
- `product.created` - New product from CMS
- `product.updated` - Product updated in CMS

## Environment Variables

```
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
STRIPE_API_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
PAYLOAD_WEBHOOK_SECRET=your-payload-secret
PAYLOAD_URL=http://localhost:3001
```

## Deployment

### Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## License

MIT
