# CHECK MEDUSA STATUS
Write-Host "`n🔍 Checking Medusa Status..." -ForegroundColor Cyan
Write-Host "===========================`n" -ForegroundColor Cyan

# Check if ports are in use
Write-Host "Port Status:" -ForegroundColor Yellow
$ports = @(7001, 9000)
foreach ($port in $ports) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connections) {
            $process = Get-Process -Id $connections[0].OwningProcess -ErrorAction SilentlyContinue
            Write-Host "  Port $port : ❌ IN USE by $($process.Name) (PID: $($process.Id))" -ForegroundColor Red
        } else {
            Write-Host "  Port $port : ✅ FREE" -ForegroundColor Green
        }
    } catch {
        Write-Host "  Port $port : ✅ FREE" -ForegroundColor Green
    }
}

Write-Host ""

# Check database connection
Write-Host "Database Connection:" -ForegroundColor Yellow
Push-Location backend/medusa
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
    console.log('  ✅ Connected to database');
    
    const result = await client.query('SELECT COUNT(*) FROM \"user\"');
    console.log('  ℹ️  Users in database: ' + result.rows[0].count);
    
    await client.end();
  } catch (e) {
    console.log('  ❌ Database error: ' + e.message);
  }
})();
"
Pop-Location

Write-Host ""

# Check if Medusa is responding
Write-Host "Medusa Server:" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:9000/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✅ Medusa is running and responding" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Medusa is not responding" -ForegroundColor Red
}

Write-Host ""

# Check if admin panel is accessible
Write-Host "Admin Panel:" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:7001" -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "  ✅ Admin panel is accessible" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Admin panel is not accessible" -ForegroundColor Red
}

Write-Host ""
Write-Host "===========================`n" -ForegroundColor Cyan

# Provide recommendations
Write-Host "Recommendations:" -ForegroundColor Yellow

$portsInUse = $false
foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        $portsInUse = $true
        break
    }
}

if ($portsInUse) {
    Write-Host "  ⚠️  Ports are in use. Run: .\kill-medusa-ports.ps1" -ForegroundColor Yellow
} else {
    Write-Host "  ✅ Ports are free. You can start Medusa." -ForegroundColor Green
}

Write-Host ""
