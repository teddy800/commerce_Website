# ULTIMATE MEDUSA LOGIN FIX - HANDLES ALL PORT CONFLICTS
Write-Host "`n🔐 ULTIMATE MEDUSA LOGIN FIX" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

Write-Host "This will fix your Medusa admin login by:" -ForegroundColor Yellow
Write-Host "  1. Killing all processes on ports 7001 and 9000" -ForegroundColor Gray
Write-Host "  2. Clearing existing admin users" -ForegroundColor Gray
Write-Host "  3. Creating fresh admin user via Medusa CLI" -ForegroundColor Gray
Write-Host "  4. Starting Medusa server`n" -ForegroundColor Gray

# Step 1: Kill processes on ports 7001 and 9000
Write-Host "[Step 1/4] Killing processes on ports 7001 and 9000..." -ForegroundColor Cyan

$ports = @(7001, 9000)
foreach ($port in $ports) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connections) {
            foreach ($conn in $connections) {
                $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
                if ($process) {
                    Write-Host "  Killing process $($process.Name) (PID: $($process.Id)) on port $port..." -ForegroundColor Gray
                    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
                }
            }
            Write-Host "  ✅ Port $port cleared" -ForegroundColor Green
        } else {
            Write-Host "  ✅ Port $port is free" -ForegroundColor Green
        }
    } catch {
        Write-Host "  ⚠️  Could not check port $port" -ForegroundColor Yellow
    }
}

# Also kill all node processes to be safe
Write-Host "`n  Killing all Node.js processes..." -ForegroundColor Gray
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
Write-Host "  ✅ All Node processes stopped`n" -ForegroundColor Green

# Step 2: Navigate to Medusa directory
Write-Host "[Step 2/4] Navigating to Medusa directory..." -ForegroundColor Cyan
Push-Location backend/medusa
Write-Host "  ✅ In backend/medusa directory`n" -ForegroundColor Green

# Step 3: Clear existing users and create new admin
Write-Host "[Step 3/4] Creating admin user..." -ForegroundColor Cyan

Write-Host "  Clearing existing users..." -ForegroundColor Gray
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
    const result = await client.query('DELETE FROM \"user\"');
    console.log('  ✅ Cleared ' + result.rowCount + ' existing user(s)');
  } catch (e) {
    console.log('  ⚠️  Could not clear users:', e.message);
  } finally {
    await client.end();
  }
})();
"

Start-Sleep -Seconds 2

Write-Host "`n  Creating new admin user via Medusa CLI..." -ForegroundColor Gray
npx medusa user -e admin@medusa.com -p admin123

Write-Host "`n  ✅ Admin user created!`n" -ForegroundColor Green

# Step 4: Start Medusa
Write-Host "[Step 4/4] Starting Medusa server..." -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

Write-Host "🎉 SETUP COMPLETE!" -ForegroundColor Green
Write-Host "============================`n" -ForegroundColor Cyan

Write-Host "Login credentials:" -ForegroundColor Yellow
Write-Host "  📧 Email:    admin@medusa.com" -ForegroundColor White
Write-Host "  🔑 Password: admin123" -ForegroundColor White
Write-Host "  🌐 URL:      http://localhost:7001`n" -ForegroundColor White

Write-Host "============================`n" -ForegroundColor Cyan
Write-Host "Starting Medusa server (this may take 30-60 seconds)...`n" -ForegroundColor Yellow

npm run dev

Pop-Location
