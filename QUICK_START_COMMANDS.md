# Quick Start Commands

Copy and paste these commands to get started quickly!

## Initial Setup

### 1. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### 2. CMS Setup (Payload)
```bash
# Create CMS directory
mkdir cms
cd cms

# Initialize Payload CMS
npx create-payload-app@latest . --template blank --db mongodb

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URI=mongodb://localhost:27017/payload-cms
PAYLOAD_SECRET=$(openssl rand -base64 32)
MEDUSA_WEBHOOK_SECRET=$(openssl rand -base64 32)
PORT=3001
EOF

# Run CMS
npm run dev
```

### 3. Backend Setup (Medusa)
```bash
# Create backend directory
mkdir backend
cd backend

# Initialize Medusa
npx create-medusa-app@latest

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://localhost:5432/medusa-db
JWT_SECRET=$(openssl rand -base64 32)
COOKIE_SECRET=$(openssl rand -base64 32)
PAYLOAD_WEBHOOK_SECRET=$(openssl rand -base64 32)
PORT=9000
EOF

# Run migrations
npx medusa migrations run

# Create admin user
npx medusa user -e admin@example.com -p supersecret

# Run backend
npm run dev
```

### 4. Sync Service Setup
```bash
# Create sync service directory
mkdir sync-service
cd sync-service

# Initialize npm
npm init -y

# Install dependencies
npm install express axios dotenv
npm install -D typescript @types/express @types/node ts-node nodemon

# Create tsconfig.json
cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOF

# Create .env file
cat > .env << EOF
PAYLOAD_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
PORT=3002
EOF

# Create src directory
mkdir src

# Run sync service
npm run dev
```

## Running All Services

### Option 1: Separate Terminals

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - CMS:**
```bash
cd cms
npm run dev
```

**Terminal 3 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 4 - Sync Service:**
```bash
cd sync-service
npm run dev
```

### Option 2: Using tmux (Linux/Mac)
```bash
# Install tmux if not installed
# Ubuntu: sudo apt install tmux
# Mac: brew install tmux

# Start tmux session
tmux new -s ecommerce

# Split into 4 panes
Ctrl+b "    # Split horizontally
Ctrl+b %    # Split vertically
Ctrl+b o    # Switch panes

# In each pane, run:
# Pane 1: cd frontend && npm run dev
# Pane 2: cd cms && npm run dev
# Pane 3: cd backend && npm run dev
# Pane 4: cd sync-service && npm run dev
```

### Option 3: Using concurrently (Recommended)
```bash
# Install concurrently globally
npm install -g concurrently

# Create start script in root package.json
cat > package.json << EOF
{
  "name": "ecommerce-platform",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:cms\" \"npm run dev:backend\" \"npm run dev:sync\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:cms": "cd cms && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "dev:sync": "cd sync-service && npm run dev"
  }
}
EOF

# Run all services
npm run dev
```

## Database Setup

### MongoDB (for CMS)

**Option 1: Local MongoDB**
```bash
# Install MongoDB
# Ubuntu:
sudo apt install mongodb

# Mac:
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb  # Ubuntu
brew services start mongodb-community  # Mac
```

**Option 2: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `DATABASE_URI` in `cms/.env`

### PostgreSQL (for Backend)

**Option 1: Local PostgreSQL**
```bash
# Install PostgreSQL
# Ubuntu:
sudo apt install postgresql

# Mac:
brew install postgresql

# Start PostgreSQL
sudo systemctl start postgresql  # Ubuntu
brew services start postgresql  # Mac

# Create database
sudo -u postgres psql
CREATE DATABASE medusa_db;
\q
```

**Option 2: Render PostgreSQL (Cloud)**
1. Go to https://render.com
2. Create PostgreSQL database
3. Get connection string
4. Update `DATABASE_URL` in `backend/.env`

## Testing Commands

### Run Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view

# Run audit and save report
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

### Test API Endpoints

**Test CMS API:**
```bash
# Get all products
curl http://localhost:3001/api/products

# Get homepage content
curl http://localhost:3001/api/homepage-content
```

**Test Medusa API:**
```bash
# Get all products
curl http://localhost:9000/store/products

# Create cart
curl -X POST http://localhost:9000/store/carts
```

## Deployment Commands

### Deploy to Vercel

**Frontend:**
```bash
cd frontend
vercel --prod
```

**CMS:**
```bash
cd cms
vercel --prod
```

### Deploy to Render

**Backend:**
```bash
# Push to GitHub first
git add .
git commit -m "Ready for deployment"
git push origin main

# Then deploy via Render dashboard
```

## Useful Commands

### Clear Node Modules
```bash
# Remove all node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Reinstall all dependencies
npm install
```

### Kill Ports
```bash
# Kill process on specific port
npx kill-port 3000
npx kill-port 3001
npx kill-port 9000
npx kill-port 3002
```

### Check Running Processes
```bash
# List all Node processes
ps aux | grep node

# List processes on specific port
lsof -i :3000
```

### Git Commands
```bash
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main
```

### Environment Variables

**Generate Random Secrets:**
```bash
# Generate random secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Troubleshooting Commands

### Check Node Version
```bash
node --version  # Should be 18+
npm --version
```

### Check Database Connection

**MongoDB:**
```bash
mongosh
show dbs
use payload-cms
show collections
```

**PostgreSQL:**
```bash
psql -U postgres
\l  # List databases
\c medusa_db  # Connect to database
\dt  # List tables
```

### View Logs

**Frontend:**
```bash
cd frontend
npm run dev 2>&1 | tee frontend.log
```

**Backend:**
```bash
cd backend
npm run dev 2>&1 | tee backend.log
```

### Clear Cache
```bash
# Clear Next.js cache
cd frontend
rm -rf .next

# Clear npm cache
npm cache clean --force
```

## Production Checklist

Before deploying to production:

```bash
# 1. Run tests
npm test

# 2. Check TypeScript
npm run type-check

# 3. Run linter
npm run lint

# 4. Build for production
npm run build

# 5. Run Lighthouse audit
lighthouse http://localhost:3000 --view

# 6. Check environment variables
cat .env.local

# 7. Commit and push
git add .
git commit -m "Ready for production"
git push origin main
```

## Quick Reference

### URLs
- Frontend: http://localhost:3000
- CMS Admin: http://localhost:3001/admin
- CMS API: http://localhost:3001/api
- Medusa Admin: http://localhost:9000/app
- Medusa API: http://localhost:9000/store
- Sync Service: http://localhost:3002

### Default Credentials
- CMS Admin: Create on first run
- Medusa Admin: admin@example.com / supersecret

### Important Files
- Frontend config: `frontend/next.config.js`
- CMS config: `cms/payload.config.ts`
- Backend config: `backend/medusa-config.js`
- Tailwind config: `frontend/tailwind.config.ts`

---

Save this file for quick reference! 📋
