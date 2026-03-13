# Complete Medusa restart with authentication fix
Write-Host "🔧 MEDUSA COMPLETE RESTART" -ForegroundColor Cyan
Write-Host "==========================`n" -ForegroundColor Cyan

# Step 1: Kill all Node processes (to clear ports)
Write-Host "Step 1: Stopping all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✅ All Node processes stopped`n" -ForegroundColor Green

# Step 2: Kill specific ports if still occupied
Write-Host "Step 2: Clearing ports 7001 and 9000..." -ForegroundColor Yellow

$port7001 = Get-NetTCPConnection -LocalPort 7001 -ErrorAction SilentlyContinue
if ($port7001) {
    $pid = $port7001.OwningProcess
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "  Killed process on port 7001" -ForegroundColor Gray
}

$port9000 = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($port9000) {
    $pid = $port9000.OwningProcess
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "  Killed process on port 9000" -ForegroundColor Gray
}

Write-Host "✅ Ports cleared`n" -ForegroundColor Green

# Step 3: Fix authentication
Write-Host "Step 3: Fixing authentication..." -ForegroundColor Yellow
node fix-auth-completely.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Authentication fix failed!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Start Medusa
Write-Host "Step 4: Starting Medusa..." -ForegroundColor Yellow
Write-Host "==========================`n" -ForegroundColor Cyan
Write-Host "🚀 Medusa is starting..." -ForegroundColor Green
Write-Host "📧 Login with: admin@medusa.com" -ForegroundColor Cyan
Write-Host "🔑 Password: admin123`n" -ForegroundColor Cyan

npm run dev
