# ULTIMATE MEDUSA FIX - Uses Medusa's built-in user creation
Write-Host "🔧 ULTIMATE MEDUSA FIX" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Step 1: Kill all processes
Write-Host "Step 1: Killing all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Clear specific ports
$port7001 = Get-NetTCPConnection -LocalPort 7001 -ErrorAction SilentlyContinue
if ($port7001) {
    Stop-Process -Id $port7001.OwningProcess -Force -ErrorAction SilentlyContinue
}

$port9000 = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($port9000) {
    Stop-Process -Id $port9000.OwningProcess -Force -ErrorAction SilentlyContinue
}

Write-Host "✅ All processes killed`n" -ForegroundColor Green

# Step 2: Delete all users from database
Write-Host "Step 2: Clearing all users from database..." -ForegroundColor Yellow
node -e "
const { Client } = require('pg');
require('dotenv').config();

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    await client.query('DELETE FROM \"user\"');
    console.log('✅ All users deleted');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await client.end();
  }
})();
"
Start-Sleep -Seconds 2
Write-Host ""

# Step 3: Create user using Medusa's API
Write-Host "Step 3: Creating admin user via Medusa API..." -ForegroundColor Yellow
node create-admin-via-medusa-api.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  API method failed, trying direct database method..." -ForegroundColor Yellow
    node fix-auth-completely.js
}
Write-Host ""

# Step 4: Start Medusa
Write-Host "Step 4: Starting Medusa..." -ForegroundColor Yellow
Write-Host "=====================`n" -ForegroundColor Cyan
Write-Host "🚀 Medusa is starting..." -ForegroundColor Green
Write-Host "📧 Email: admin@medusa.com" -ForegroundColor Cyan
Write-Host "🔑 Password: admin123" -ForegroundColor Cyan
Write-Host "🌐 URL: http://localhost:7001`n" -ForegroundColor Cyan

npm run dev
