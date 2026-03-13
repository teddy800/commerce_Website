# Trigger Medusa's First-Time Setup Wizard
Write-Host "`n🧙 TRIGGERING MEDUSA SETUP WIZARD" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Step 1: Stop all processes
Write-Host "Step 1: Stopping all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✅ Processes stopped`n" -ForegroundColor Green

# Step 2: Delete ALL users from database
Write-Host "Step 2: Deleting all users from database..." -ForegroundColor Yellow
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
    console.log('✅ Deleted ' + result.rowCount + ' user(s)');
    
    // Verify no users exist
    const check = await client.query('SELECT COUNT(*) FROM \"user\"');
    console.log('✅ Users remaining: ' + check.rows[0].count);
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    await client.end();
  }
})();
"
Start-Sleep -Seconds 2
Write-Host ""

# Step 3: Instructions for browser
Write-Host "Step 3: Clear your browser cache" -ForegroundColor Yellow
Write-Host "================================`n" -ForegroundColor Cyan
Write-Host "IMPORTANT: Before starting Medusa, clear your browser:" -ForegroundColor Red
Write-Host ""
Write-Host "For Chrome/Edge:" -ForegroundColor White
Write-Host "  1. Press F12 to open DevTools" -ForegroundColor Gray
Write-Host "  2. Right-click the refresh button" -ForegroundColor Gray
Write-Host "  3. Select 'Empty Cache and Hard Reload'" -ForegroundColor Gray
Write-Host ""
Write-Host "OR manually:" -ForegroundColor White
Write-Host "  1. Press Ctrl+Shift+Delete" -ForegroundColor Gray
Write-Host "  2. Select 'Cookies and other site data'" -ForegroundColor Gray
Write-Host "  3. Select 'Cached images and files'" -ForegroundColor Gray
Write-Host "  4. Click 'Clear data'" -ForegroundColor Gray
Write-Host ""
Write-Host "Press ENTER when you've cleared the cache..." -ForegroundColor Yellow
$null = Read-Host

# Step 4: Start Medusa
Write-Host "`nStep 4: Starting Medusa..." -ForegroundColor Yellow
Write-Host "==================================`n" -ForegroundColor Cyan
Write-Host "🚀 Medusa is starting...`n" -ForegroundColor Green
Write-Host "📋 WHAT TO DO NEXT:" -ForegroundColor Cyan
Write-Host "  1. Wait for Medusa to fully start" -ForegroundColor White
Write-Host "  2. Open: http://localhost:7001" -ForegroundColor White
Write-Host "  3. Look for one of these:" -ForegroundColor White
Write-Host "     - 'Create your account' page" -ForegroundColor Gray
Write-Host "     - 'Setup' wizard" -ForegroundColor Gray
Write-Host "     - 'Create admin user' form" -ForegroundColor Gray
Write-Host "     - 'Get started' page" -ForegroundColor Gray
Write-Host ""
Write-Host "  If you see a LOGIN page instead:" -ForegroundColor Yellow
Write-Host "     - The setup wizard is not available" -ForegroundColor Gray
Write-Host "     - Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host "     - We'll try a different approach" -ForegroundColor Gray
Write-Host ""
Write-Host "==================================`n" -ForegroundColor Cyan

npm run dev
