# Quick Start Script for Windows PowerShell
# Run this script to set up and start all services

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cards Against Humanity Clone Setup  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param($Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

$allGood = $true

# Check Node.js
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Node.js not found. Please install from https://nodejs.org/" -ForegroundColor Red
    $allGood = $false
}

# Check npm
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "[OK] npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "[ERROR] npm not found" -ForegroundColor Red
    $allGood = $false
}

# Check PostgreSQL
if (Test-Command "psql") {
    Write-Host "[OK] PostgreSQL installed" -ForegroundColor Green
} else {
    Write-Host "[WARNING] PostgreSQL not found. Install from https://www.postgresql.org/" -ForegroundColor Yellow
    Write-Host "         Required for Medusa backend" -ForegroundColor Yellow
}

# Check MongoDB
if (Test-Command "mongod") {
    Write-Host "[OK] MongoDB installed" -ForegroundColor Green
} else {
    Write-Host "[WARNING] MongoDB not found. Install from https://www.mongodb.com/" -ForegroundColor Yellow
    Write-Host "         Required for Payload CMS" -ForegroundColor Yellow
}

Write-Host ""

if (-not $allGood) {
    Write-Host "Please install missing prerequisites before continuing." -ForegroundColor Red
    exit 1
}

# Ask user what to do
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "1. Install all dependencies" -ForegroundColor White
Write-Host "2. Setup environment files" -ForegroundColor White
Write-Host "3. Start all services" -ForegroundColor White
Write-Host "4. Full setup (1 + 2 + 3)" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        Write-Host ""
        
        # Frontend
        Write-Host "Installing Frontend dependencies..." -ForegroundColor Cyan
        Set-Location frontend
        npm install
        Set-Location ..
        
        # Medusa
        Write-Host "Installing Medusa dependencies..." -ForegroundColor Cyan
        Set-Location backend/medusa
        npm install
        Set-Location ../..
        
        # Payload
        Write-Host "Installing Payload CMS dependencies..." -ForegroundColor Cyan
        Set-Location cms/payload
        npm install
        Set-Location ../..
        
        # Sync Service
        Write-Host "Installing Sync Service dependencies..." -ForegroundColor Cyan
        Set-Location sync-service
        npm install
        Set-Location ..
        
        Write-Host ""
        Write-Host "[SUCCESS] All dependencies installed!" -ForegroundColor Green
    }
    
    "2" {
        Write-Host ""
        Write-Host "Setting up environment files..." -ForegroundColor Yellow
        Write-Host ""
        
        # Medusa .env
        if (-not (Test-Path "backend/medusa/.env")) {
            Write-Host "Creating Medusa .env file..." -ForegroundColor Cyan
            $postgresPassword = Read-Host "Enter PostgreSQL password"
            
            $medusaEnv = @"
DATABASE_URL=postgresql://postgres:$postgresPassword@localhost:5432/medusa_db
PORT=9000
JWT_SECRET=$(New-Guid)
COOKIE_SECRET=$(New-Guid)
STORE_CORS=http://localhost:3000,http://localhost:3001
ADMIN_CORS=http://localhost:7001
SYNC_SERVICE_URL=http://localhost:4000
"@
            $medusaEnv | Out-File -FilePath "backend/medusa/.env" -Encoding UTF8
            Write-Host "[OK] Medusa .env created" -ForegroundColor Green
        } else {
            Write-Host "[SKIP] Medusa .env already exists" -ForegroundColor Yellow
        }
        
        # Payload .env
        if (-not (Test-Path "cms/payload/.env")) {
            Write-Host "Creating Payload .env file..." -ForegroundColor Cyan
            
            $payloadEnv = @"
MONGODB_URI=mongodb://localhost:27017/payload-cms
PAYLOAD_SECRET=$(New-Guid)
PAYLOAD_PORT=3001
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
MEDUSA_URL=http://localhost:9000
SYNC_SERVICE_URL=http://localhost:4000
"@
            $payloadEnv | Out-File -FilePath "cms/payload/.env" -Encoding UTF8
            Write-Host "[OK] Payload .env created" -ForegroundColor Green
        } else {
            Write-Host "[SKIP] Payload .env already exists" -ForegroundColor Yellow
        }
        
        # Sync Service .env
        if (-not (Test-Path "sync-service/.env")) {
            Write-Host "Creating Sync Service .env file..." -ForegroundColor Cyan
            
            $syncEnv = @"
PORT=4000
MEDUSA_URL=http://localhost:9000
PAYLOAD_URL=http://localhost:3001
"@
            $syncEnv | Out-File -FilePath "sync-service/.env" -Encoding UTF8
            Write-Host "[OK] Sync Service .env created" -ForegroundColor Green
        } else {
            Write-Host "[SKIP] Sync Service .env already exists" -ForegroundColor Yellow
        }
        
        # Frontend .env.local
        if (-not (Test-Path "frontend/.env.local")) {
            Write-Host "Creating Frontend .env.local file..." -ForegroundColor Cyan
            
            $frontendEnv = @"
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
NEXT_PUBLIC_SYNC_SERVICE_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Cards Against Humanity Clone
REVALIDATE_SECRET=$(New-Guid)
"@
            $frontendEnv | Out-File -FilePath "frontend/.env.local" -Encoding UTF8
            Write-Host "[OK] Frontend .env.local created" -ForegroundColor Green
        } else {
            Write-Host "[SKIP] Frontend .env.local already exists" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "[SUCCESS] Environment files created!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Create PostgreSQL database: medusa_db" -ForegroundColor White
        Write-Host "2. Run Medusa migrations: cd backend/medusa && npm run build && npx medusa migrations run" -ForegroundColor White
        Write-Host "3. Create Medusa admin user: npx medusa user -e admin@test.com -p admin123" -ForegroundColor White
    }
    
    "3" {
        Write-Host ""
        Write-Host "Starting all services..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "This will open 4 new terminal windows:" -ForegroundColor Cyan
        Write-Host "1. Medusa Backend (Port 9000)" -ForegroundColor White
        Write-Host "2. Payload CMS (Port 3001)" -ForegroundColor White
        Write-Host "3. Sync Service (Port 4000)" -ForegroundColor White
        Write-Host "4. Frontend (Port 3000)" -ForegroundColor White
        Write-Host ""
        
        $confirm = Read-Host "Continue? (y/n)"
        
        if ($confirm -eq "y") {
            # Start Medusa
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\medusa'; Write-Host 'Starting Medusa Backend...' -ForegroundColor Cyan; npm run dev"
            
            # Start Payload
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\cms\payload'; Write-Host 'Starting Payload CMS...' -ForegroundColor Cyan; npm run dev"
            
            # Start Sync Service
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\sync-service'; Write-Host 'Starting Sync Service...' -ForegroundColor Cyan; npm run dev"
            
            # Start Frontend
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host 'Starting Frontend...' -ForegroundColor Cyan; npm run dev"
            
            Write-Host ""
            Write-Host "[SUCCESS] All services starting..." -ForegroundColor Green
            Write-Host ""
            Write-Host "Access your services at:" -ForegroundColor Cyan
            Write-Host "Frontend:     http://localhost:3000" -ForegroundColor White
            Write-Host "Payload CMS:  http://localhost:3001/admin" -ForegroundColor White
            Write-Host "Medusa API:   http://localhost:9000" -ForegroundColor White
            Write-Host "Sync Service: http://localhost:4000" -ForegroundColor White
        }
    }
    
    "4" {
        Write-Host ""
        Write-Host "Running full setup..." -ForegroundColor Yellow
        Write-Host ""
        
        # Run all steps
        & $MyInvocation.MyCommand.Path -Choice "1"
        & $MyInvocation.MyCommand.Path -Choice "2"
        
        Write-Host ""
        Write-Host "Setup complete! Now run migrations:" -ForegroundColor Cyan
        Write-Host "cd backend/medusa" -ForegroundColor White
        Write-Host "npm run build" -ForegroundColor White
        Write-Host "npx medusa migrations run" -ForegroundColor White
        Write-Host "npx medusa user -e admin@test.com -p admin123" -ForegroundColor White
        Write-Host ""
        Write-Host "Then start services with option 3" -ForegroundColor Cyan
    }
    
    "5" {
        Write-Host "Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    
    default {
        Write-Host "Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host ""
