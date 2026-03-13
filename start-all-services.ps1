# START ALL SERVICES
Write-Host "`n🚀 STARTING ALL SERVICES..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Kill any existing processes on required ports
Write-Host "Cleaning up ports..." -ForegroundColor Yellow
$ports = @(3000, 3001, 7001, 9000)
foreach ($port in $ports) {
    try {
        $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
        if ($process) {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            Write-Host "  ✅ Killed process on port $port" -ForegroundColor Green
        }
    } catch {
        # Port is already free
    }
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "STARTING SERVICES" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "📝 INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "  This will open 3 new terminal windows" -ForegroundColor White
Write-Host "  Each window will run one service:`n" -ForegroundColor White
Write-Host "  1. Medusa Backend (Port 9000 & 7001)" -ForegroundColor Cyan
Write-Host "  2. Payload CMS (Port 3001)" -ForegroundColor Cyan
Write-Host "  3. Frontend (Port 3000)`n" -ForegroundColor Cyan

Write-Host "Press any key to start all services..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Start Medusa Backend
Write-Host "`n[1/3] Starting Medusa Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend\medusa'; Write-Host '🔧 MEDUSA BACKEND' -ForegroundColor Cyan; Write-Host 'Starting on ports 9000 (API) and 7001 (Admin)...' -ForegroundColor Yellow; npm run dev"
Start-Sleep -Seconds 2

# Start Payload CMS
Write-Host "[2/3] Starting Payload CMS..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\cms\payload'; Write-Host '📦 PAYLOAD CMS' -ForegroundColor Cyan; Write-Host 'Starting on port 3001...' -ForegroundColor Yellow; npm run dev"
Start-Sleep -Seconds 2

# Start Frontend
Write-Host "[3/3] Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '🎨 FRONTEND' -ForegroundColor Cyan; Write-Host 'Starting on port 3000...' -ForegroundColor Yellow; npm run dev"

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ ALL SERVICES STARTING!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Wait 30-60 seconds for all services to start, then visit:" -ForegroundColor Yellow
Write-Host "  Frontend:      http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Payload CMS:   http://localhost:3001/admin" -ForegroundColor Cyan
Write-Host "  Medusa Admin:  http://localhost:7001" -ForegroundColor Cyan
Write-Host "  Medusa API:    http://localhost:9000`n" -ForegroundColor Cyan

Write-Host "To stop all services:" -ForegroundColor Yellow
Write-Host "  Close each terminal window or press Ctrl+C in each`n" -ForegroundColor White

Write-Host "================================`n" -ForegroundColor Cyan
