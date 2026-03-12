# PowerShell setup script for Windows

Write-Host "🚀 Setting up Cards Against Humanity E-commerce Platform" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed." -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host ""
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Install CMS dependencies
Write-Host ""
Write-Host "📦 Installing CMS dependencies..." -ForegroundColor Yellow
Set-Location cms/payload
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ CMS dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install CMS dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Install Medusa dependencies
Write-Host ""
Write-Host "📦 Installing Medusa dependencies..." -ForegroundColor Yellow
Set-Location backend/medusa
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Medusa dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install Medusa dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Install sync service dependencies
Write-Host ""
Write-Host "📦 Installing sync service dependencies..." -ForegroundColor Yellow
Set-Location sync-service
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Sync service dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install sync service dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Create .env files from examples
Write-Host ""
Write-Host "📝 Creating .env files from examples..." -ForegroundColor Yellow

if (-not (Test-Path "frontend/.env")) {
    Copy-Item "frontend/.env.example" "frontend/.env"
    Write-Host "✓ Created frontend/.env" -ForegroundColor Green
} else {
    Write-Host "⚠ frontend/.env already exists, skipping" -ForegroundColor Yellow
}

if (-not (Test-Path "cms/payload/.env")) {
    Copy-Item "cms/payload/.env.example" "cms/payload/.env"
    Write-Host "✓ Created cms/payload/.env" -ForegroundColor Green
} else {
    Write-Host "⚠ cms/payload/.env already exists, skipping" -ForegroundColor Yellow
}

if (-not (Test-Path "backend/medusa/.env")) {
    Copy-Item "backend/medusa/.env.example" "backend/medusa/.env"
    Write-Host "✓ Created backend/medusa/.env" -ForegroundColor Green
} else {
    Write-Host "⚠ backend/medusa/.env already exists, skipping" -ForegroundColor Yellow
}

if (-not (Test-Path "sync-service/.env")) {
    Copy-Item "sync-service/.env.example" "sync-service/.env"
    Write-Host "✓ Created sync-service/.env" -ForegroundColor Green
} else {
    Write-Host "⚠ sync-service/.env already exists, skipping" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "✅ Setup completed successfully!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update .env files with your database credentials"
Write-Host "2. Start MongoDB for Payload CMS"
Write-Host "3. Start PostgreSQL for Medusa"
Write-Host "4. Run 'npm run dev' in each service directory"
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "- IMPLEMENTATION_GUIDE.md"
Write-Host "- QUICK_START.md"
Write-Host ""
