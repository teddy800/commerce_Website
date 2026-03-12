# Complete Setup Guide - Card Game Store

This guide will help you set up the entire Card Game Store project with Next.js frontend, Payload CMS, and Medusa.js backend.

## Project Structure

```
card-game-store/
├── frontend/              # Next.js frontend
├── cms/payload/          # Payload CMS
├── backend/medusa/       # Medusa.js backend
└── sync-service/         # Bidirectional sync service
```

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+ (for Medusa)
- MongoDB 5+ (for Payload CMS)
- Redis 6+ (for caching)
- Git

## Step 1: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your URLs
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001

# Start development server
npm run dev
```

Frontend runs on http://localhost:3000

## Step 2: Payload CMS Setup

```bash
cd cms/payload

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your MongoDB connection
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cah_cms
PAYLOAD_SECRET=your-secret-key

# Start development server
npm run dev
```

Admin panel runs on http://localhost:3001/admin

### Create Collections in Payload

1. Go to http://localhost:3001/admin
2. Create the following collections:
   - Products
   - Homepage Content
   - Navigation
   - Footer

## Step 3: Medusa Backend Setup

```bash
cd backend/medusa

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your database connection
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key

# Run migrations
npm run migrations

# Seed initial data
npm run seed

# Start development server
npm run dev
```

Backend runs on http://localhost:9000

## Step 4: Sync Service Setup

The sync service keeps Payload CMS and Medusa in sync.

```bash
cd sync-service

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env
PAYLOAD_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
PAYLOAD_WEBHOOK_SECRET=your-secret
MEDUSA_WEBHOOK_SECRET=your-secret

# Start sync service
npm run dev
```

Sync service runs on http://localhost:3002

## Step 5: Configure Webhooks

### In Payload CMS

1. Go to Settings → Webhooks
2. Create webhook for product changes:
   - Event: `products.change`
   - URL: `http://localhost:3002/webhooks/payload`
   - Secret: Your PAYLOAD_WEBHOOK_SECRET

### In Medusa

1. Go to Settings → Webhooks
2. Create webhook for inventory changes:
   - Event: `inventory.updated`
   - URL: `http://localhost:3001/api/webhooks/medusa`
   - Secret: Your MEDUSA_WEBHOOK_SECRET

## Step 6: Test the Setup

### Test Frontend

1. Open http://localhost:3000
2. Browse products
3. Add items to cart
4. Proceed to checkout

### Test CMS

1. Open http://localhost:3001/admin
2. Create a product
3. Verify it appears in Medusa
4. Verify it appears on frontend

### Test Medusa

1. Open http://localhost:9000/admin
2. Create a product
3. Verify it syncs to Payload CMS
4. Verify it appears on frontend

## Deployment

### Frontend (Vercel)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# Set environment variables
# Deploy
```

### CMS (Vercel)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# Set environment variables
# Deploy
```

### Backend (Render)

```bash
# Push to GitHub
git push origin main

# Create new Web Service on Render
# Connect GitHub repository
# Set environment variables
# Deploy
```

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_MEDUSA_URL=https://medusa-backend.render.com
NEXT_PUBLIC_PAYLOAD_URL=https://cms.vercel.app
NEXT_PUBLIC_SITE_URL=https://cardgamestore.com
```

### Payload CMS (.env)

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cah_cms
PAYLOAD_SECRET=your-secret-key
MEDUSA_WEBHOOK_SECRET=your-medusa-secret
MEDUSA_URL=https://medusa-backend.render.com
```

### Medusa Backend (.env)

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/medusa_db
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret-key
STRIPE_API_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
PAYLOAD_WEBHOOK_SECRET=your-payload-secret
PAYLOAD_URL=https://cms.vercel.app
```

## Troubleshooting

### Frontend not connecting to backend

- Check NEXT_PUBLIC_MEDUSA_URL and NEXT_PUBLIC_PAYLOAD_URL
- Ensure backend is running
- Check CORS settings in backend

### CMS not syncing to Medusa

- Check webhook configuration
- Verify webhook secret matches
- Check sync service logs

### Database connection errors

- Verify DATABASE_URL is correct
- Ensure PostgreSQL/MongoDB is running
- Check network connectivity

## Performance Optimization

### Frontend

- Run `npm run build` to check bundle size
- Use Lighthouse to check performance
- Optimize images with next/image

### CMS

- Add database indexes
- Enable caching
- Optimize queries

### Backend

- Enable Redis caching
- Optimize database queries
- Use connection pooling

## Security

- Use HTTPS in production
- Set strong JWT secrets
- Enable CORS properly
- Use environment variables for secrets
- Enable rate limiting
- Use CSRF protection

## Support

For issues or questions:
1. Check the README files in each directory
2. Review the documentation
3. Check logs for errors
4. Verify environment variables

## Next Steps

1. Customize the design to match your brand
2. Add more products to the catalog
3. Set up payment processing
4. Configure email notifications
5. Set up analytics
6. Deploy to production

Good luck with your Card Game Store!
