# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+
- PostgreSQL running
- MongoDB running
- Redis running

### Step 1: Install Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

**Frontend**: http://localhost:3000

### Step 2: Install CMS

```bash
cd cms/payload
npm install
cp .env.example .env
npm run dev
```

**CMS Admin**: http://localhost:3001/admin

### Step 3: Install Backend

```bash
cd backend/medusa
npm install
cp .env.example .env
npm run migrations
npm run seed
npm run dev
```

**Backend**: http://localhost:9000

### Step 4: Install Sync Service

```bash
cd sync-service
npm install
cp .env.example .env
npm run dev
```

**Sync Service**: http://localhost:3002

## 📋 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### CMS (.env)
```
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cah_cms
PAYLOAD_SECRET=your-secret-key
MEDUSA_WEBHOOK_SECRET=your-secret
MEDUSA_URL=http://localhost:9000
```

### Backend (.env)
```
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
STRIPE_API_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
PAYLOAD_WEBHOOK_SECRET=your-secret
PAYLOAD_URL=http://localhost:3001
```

### Sync Service (.env)
```
NODE_ENV=development
PORT=3002
PAYLOAD_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
PAYLOAD_WEBHOOK_SECRET=your-secret
MEDUSA_WEBHOOK_SECRET=your-secret
```

## 🧪 Test the Application

### 1. Homepage
- Open http://localhost:3000
- Should see hero section and featured products

### 2. Products
- Click "Shop Now" or go to /products
- Should see product grid

### 3. Product Detail
- Click on any product
- Should see product details, images, and add to cart button

### 4. Shopping Cart
- Click cart icon in header
- Add items to cart
- Should see cart items and total

### 5. Checkout
- Click "Proceed to Checkout"
- Fill in shipping information
- Select shipping method
- Enter payment details
- Place order

### 6. Authentication
- Go to /account/login
- Try login or register
- Should see account page

### 7. CMS
- Go to http://localhost:3001/admin
- Create a product
- Should appear on frontend

## 🔧 Common Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check  # Check TypeScript
```

### CMS
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run migrations  # Run database migrations
npm run seed     # Seed initial data
```

### Sync Service
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:3001 | xargs kill -9  # CMS
lsof -ti:9000 | xargs kill -9  # Backend
lsof -ti:3002 | xargs kill -9  # Sync
```

### Database Connection Error
- Ensure PostgreSQL is running: `psql -U postgres`
- Ensure MongoDB is running: `mongosh`
- Ensure Redis is running: `redis-cli ping`

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts
Change ports in:
- Frontend: `next.config.js`
- CMS: `payload.config.ts`
- Backend: `medusa-config.js`
- Sync: `.env` PORT variable

## 📊 Check Status

### Frontend Health
```bash
curl http://localhost:3000
```

### CMS Health
```bash
curl http://localhost:3001/api/health
```

### Backend Health
```bash
curl http://localhost:9000/health
```

### Sync Service Health
```bash
curl http://localhost:3002/health
```

## 🚀 Deploy to Production

### Frontend (Vercel)
```bash
git push origin main
# Connect to Vercel and deploy
```

### CMS (Vercel)
```bash
git push origin main
# Connect to Vercel and deploy
```

### Backend (Render)
```bash
git push origin main
# Create Web Service on Render and deploy
```

## 📚 Documentation

- [Main README](./README.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- [Frontend README](./frontend/README.md)
- [CMS README](./cms/payload/README.md)
- [Backend README](./backend/medusa/README.md)
- [Sync Service README](./sync-service/README.md)

## ✅ Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL running
- [ ] MongoDB running
- [ ] Redis running
- [ ] Frontend installed and running
- [ ] CMS installed and running
- [ ] Backend installed and running
- [ ] Sync service installed and running
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:3001/admin
- [ ] Can add items to cart
- [ ] Can complete checkout
- [ ] Can create products in CMS

## 🎉 You're Ready!

Your Card Game Store is now running locally. Start building! 🚀

---

**Need Help?**
- Check the README files
- Review the SETUP_GUIDE.md
- Check logs for errors
- Verify environment variables
