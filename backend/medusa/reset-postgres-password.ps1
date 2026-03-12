# PostgreSQL Password Reset Script
# Run this as Administrator

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Red
Write-Host "║     PostgreSQL Password Reset Wizard                      ║" -ForegroundColor Red
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Red
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ This script must be run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ Running as Administrator" -ForegroundColor Green
Write-Host ""

# Step 1: Find PostgreSQL installation
Write-Host "Step 1: Finding PostgreSQL installation..." -ForegroundColor Yellow

$pgVersions = @("16", "15", "14", "13", "12", "11", "10")
$pgPath = $null
$pgVersion = $null

foreach ($ver in $pgVersions) {
    $testPath = "C:\Program Files\PostgreSQL\$ver"
    if (Test-Path $testPath) {
        $pgPath = $testPath
        $pgVersion = $ver
        break
    }
}

if ($null -eq $pgPath) {
    Write-Host "❌ PostgreSQL installation not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PostgreSQL first or use a cloud database." -ForegroundColor Yellow
    Write-Host "See CRITICAL_PASSWORD_ISSUE.md for alternatives." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "✅ Found PostgreSQL $pgVersion at: $pgPath" -ForegroundColor Green
Write-Host ""

# Step 2: Backup pg_hba.conf
Write-Host "Step 2: Backing up pg_hba.conf..." -ForegroundColor Yellow

$pgHbaPath = "$pgPath\data\pg_hba.conf"
$pgHbaBackup = "$pgPath\data\pg_hba.conf.backup"

if (-not (Test-Path $pgHbaPath)) {
    Write-Host "❌ pg_hba.conf not found at: $pgHbaPath" -ForegroundColor Red
    pause
    exit 1
}

Copy-Item $pgHbaPath $pgHbaBackup -Force
Write-Host "✅ Backup created: $pgHbaBackup" -ForegroundColor Green
Write-Host ""

# Step 3: Modify pg_hba.conf to allow trust authentication
Write-Host "Step 3: Modifying pg_hba.conf to allow passwordless access..." -ForegroundColor Yellow

$pgHbaContent = Get-Content $pgHbaPath
$pgHbaContent = $pgHbaContent -replace "host\s+all\s+all\s+127\.0\.0\.1/32\s+md5", "host    all             all             127.0.0.1/32            trust"
$pgHbaContent = $pgHbaContent -replace "host\s+all\s+all\s+127\.0\.0\.1/32\s+scram-sha-256", "host    all             all             127.0.0.1/32            trust"
Set-Content $pgHbaPath -Value $pgHbaContent

Write-Host "✅ pg_hba.conf modified" -ForegroundColor Green
Write-Host ""

# Step 4: Restart PostgreSQL service
Write-Host "Step 4: Restarting PostgreSQL service..." -ForegroundColor Yellow

$serviceName = "postgresql-x64-$pgVersion"
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($null -eq $service) {
    Write-Host "⚠️  Service $serviceName not found, trying alternative names..." -ForegroundColor Yellow
    $service = Get-Service -Name "postgresql*" | Select-Object -First 1
}

if ($null -eq $service) {
    Write-Host "❌ PostgreSQL service not found!" -ForegroundColor Red
    pause
    exit 1
}

Restart-Service $service.Name
Start-Sleep -Seconds 3

Write-Host "✅ PostgreSQL service restarted" -ForegroundColor Green
Write-Host ""

# Step 5: Set new password
Write-Host "Step 5: Setting new password..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Enter your new PostgreSQL password:" -ForegroundColor Cyan
$newPassword = Read-Host "Password" -AsSecureString
$newPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($newPassword))

Write-Host ""
Write-Host "Connecting to PostgreSQL..." -ForegroundColor White

$env:PGPASSWORD = ""
$sqlCommand = "ALTER USER postgres WITH PASSWORD '$newPasswordPlain';"
$result = & "$pgPath\bin\psql.exe" -U postgres -d postgres -c $sqlCommand 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Password changed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to change password" -ForegroundColor Red
    Write-Host "Error: $result" -ForegroundColor Red
    
    # Restore backup
    Copy-Item $pgHbaBackup $pgHbaPath -Force
    Restart-Service $service.Name
    pause
    exit 1
}

Write-Host ""

# Step 6: Restore pg_hba.conf
Write-Host "Step 6: Restoring pg_hba.conf security settings..." -ForegroundColor Yellow

Copy-Item $pgHbaBackup $pgHbaPath -Force
Restart-Service $service.Name
Start-Sleep -Seconds 3

Write-Host "✅ Security settings restored" -ForegroundColor Green
Write-Host ""

# Step 7: Update .env file
Write-Host "Step 7: Updating .env file..." -ForegroundColor Yellow

$envPath = ".env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    $envContent = $envContent -replace "DATABASE_URL=postgresql://postgres:[^@]*@", "DATABASE_URL=postgresql://postgres:$newPasswordPlain@"
    Set-Content $envPath -Value $envContent
    Write-Host "✅ .env file updated" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found, please update manually" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              Password Reset Complete! 🎉                   ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Your new PostgreSQL password: $newPasswordPlain" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create database: psql -U postgres -c `"CREATE DATABASE medusa_db;`"" -ForegroundColor White
Write-Host "2. Run migrations: npx medusa migrations run" -ForegroundColor White
Write-Host "3. Create admin: npx medusa user -e admin@test.com -p admin123" -ForegroundColor White
Write-Host "4. Start server: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
pause
