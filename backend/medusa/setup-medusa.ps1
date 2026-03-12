# Medusa Setup Script
# This script will guide you through setting up Medusa

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         Medusa Backend Setup Wizard                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if PostgreSQL is running
Write-Host "Step 1: Checking PostgreSQL service..." -ForegroundColor Yellow
$pgService = Get-Service -Name postgresql* -ErrorAction SilentlyContinue

if ($pgService) {
    if ($pgService.Status -eq "Running") {
        Write-Host "✅ PostgreSQL is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  PostgreSQL is installed but not running" -ForegroundColor Yellow
        Write-Host "Starting PostgreSQL..." -ForegroundColor White
        Start-Service $pgService.Name
        Write-Host "✅ PostgreSQL started" -ForegroundColor Green
    }
} else {
    Write-Host "❌ PostgreSQL service not found" -ForegroundColor Red
    Write-Host "Please install PostgreSQL first: https://www.postgresql.org/download/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 2: Get PostgreSQL password
Write-Host "Step 2: PostgreSQL Password" -ForegroundColor Yellow
Write-Host "Please enter your PostgreSQL password for user 'postgres':" -ForegroundColor White
Write-Host "(Common passwords: postgres, admin, root)" -ForegroundColor Gray
$password = Read-Host "Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# Test connection
Write-Host "Testing connection..." -ForegroundColor White
$env:PGPASSWORD = $passwordPlain
$testResult = psql -U postgres -d postgres -c "SELECT 1;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Connection successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Connection failed. Please check your password." -ForegroundColor Red
    Write-Host "Error: $testResult" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Update .env file
Write-Host "Step 3: Updating .env file..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "postgresql://postgres:YOUR_PASSWORD@localhost:5432/medusa_db", "postgresql://postgres:$passwordPlain@localhost:5432/medusa_db"
Set-Content ".env" -Value $envContent
Write-Host "✅ .env file updated" -ForegroundColor Green

Write-Host ""

# Step 4: Create database
Write-Host "Step 4: Creating database..." -ForegroundColor Yellow
$dbExists = psql -U postgres -lqt 2>&1 | Select-String -Pattern "medusa_db"

if ($dbExists) {
    Write-Host "⚠️  Database 'medusa_db' already exists" -ForegroundColor Yellow
    $recreate = Read-Host "Do you want to recreate it? (y/n)"
    if ($recreate -eq "y" -or $recreate -eq "Y") {
        psql -U postgres -c "DROP DATABASE medusa_db;" 2>&1 | Out-Null
        psql -U postgres -c "CREATE DATABASE medusa_db;" 2>&1 | Out-Null
        Write-Host "✅ Database recreated" -ForegroundColor Green
    }
} else {
    psql -U postgres -c "CREATE DATABASE medusa_db;" 2>&1 | Out-Null
    Write-Host "✅ Database created" -ForegroundColor Green
}

Write-Host ""

# Step 5: Run migrations
Write-Host "Step 5: Running migrations..." -ForegroundColor Yellow
Write-Host "(This may take a minute...)" -ForegroundColor Gray
npx medusa migrations run

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migrations completed" -ForegroundColor Green
} else {
    Write-Host "❌ Migrations failed" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 6: Create admin user
Write-Host "Step 6: Creating admin user..." -ForegroundColor Yellow
npx medusa user -e admin@test.com -p admin123

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Admin user created" -ForegroundColor Green
} else {
    Write-Host "⚠️  Admin user creation failed (may already exist)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              Setup Complete! 🎉                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the server: npm run dev" -ForegroundColor White
Write-Host "2. Access API: http://localhost:9000" -ForegroundColor White
Write-Host "3. Access Admin: http://localhost:7000" -ForegroundColor White
Write-Host "   Login: admin@test.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Start server now? (y/n)" -ForegroundColor Yellow
$startServer = Read-Host

if ($startServer -eq "y" -or $startServer -eq "Y") {
    Write-Host "Starting Medusa server..." -ForegroundColor Cyan
    npm run dev
}
