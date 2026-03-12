#!/bin/bash

echo "🚀 Setting up Cards Against Humanity E-commerce Platform"
echo "=========================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm --version) detected${NC}"

# Install frontend dependencies
echo ""
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..

# Install CMS dependencies
echo ""
echo -e "${YELLOW}📦 Installing CMS dependencies...${NC}"
cd cms/payload
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ CMS dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install CMS dependencies${NC}"
    exit 1
fi
cd ../..

# Install Medusa dependencies
echo ""
echo -e "${YELLOW}📦 Installing Medusa dependencies...${NC}"
cd backend/medusa
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Medusa dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install Medusa dependencies${NC}"
    exit 1
fi
cd ../..

# Install sync service dependencies
echo ""
echo -e "${YELLOW}📦 Installing sync service dependencies...${NC}"
cd sync-service
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sync service dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install sync service dependencies${NC}"
    exit 1
fi
cd ..

# Create .env files from examples
echo ""
echo -e "${YELLOW}📝 Creating .env files from examples...${NC}"

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
else
    echo -e "${YELLOW}⚠ frontend/.env already exists, skipping${NC}"
fi

if [ ! -f "cms/payload/.env" ]; then
    cp cms/payload/.env.example cms/payload/.env
    echo -e "${GREEN}✓ Created cms/payload/.env${NC}"
else
    echo -e "${YELLOW}⚠ cms/payload/.env already exists, skipping${NC}"
fi

if [ ! -f "backend/medusa/.env" ]; then
    cp backend/medusa/.env.example backend/medusa/.env
    echo -e "${GREEN}✓ Created backend/medusa/.env${NC}"
else
    echo -e "${YELLOW}⚠ backend/medusa/.env already exists, skipping${NC}"
fi

if [ ! -f "sync-service/.env" ]; then
    cp sync-service/.env.example sync-service/.env
    echo -e "${GREEN}✓ Created sync-service/.env${NC}"
else
    echo -e "${YELLOW}⚠ sync-service/.env already exists, skipping${NC}"
fi

echo ""
echo -e "${GREEN}=========================================================="
echo "✅ Setup completed successfully!"
echo "==========================================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update .env files with your database credentials"
echo "2. Start MongoDB for Payload CMS"
echo "3. Start PostgreSQL for Medusa"
echo "4. Run 'npm run dev' in each service directory"
echo ""
echo -e "${YELLOW}For detailed instructions, see:${NC}"
echo "- IMPLEMENTATION_GUIDE.md"
echo "- QUICK_START.md"
echo ""
