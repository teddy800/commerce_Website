# Test if services can actually start
Write-Host "`n🚀 TESTING SERVICE STARTUP" -ForegroundColor Cyan
Write-Host "==========================`n" -ForegroundColor Cyan

$services = @(
    @{Name="Frontend"; Path="frontend"; Port=3000},
    @{Name="Backend"; Path="backend/medusa"; Port=9000},
    @{Name="CMS"; Path="cms/payload"; Port=3001},
    @{Name="Sync"; Path="sync-service"; Port=4000}
)

foreach ($service in $services) {
    Write-Host "Testing $($service.Name)..." -ForegroundColor Yellow
    
    # Check if port is available
    $portCheck = Get-NetTCPConnection -LocalPort $service.Port -ErrorAction SilentlyContinue
    if ($portCheck) {
        Write-Host "  ⚠️  Port $($service.Port) already in use" -ForegroundColor Yellow
    } else {
        Write-Host "  ✅ Port $($service.Port) available" -ForegroundColor Green
    }
    
    # Check if package.json exists
    if (Test-Path "$($service.Path)/package.json") {
        Write-Host "  ✅ package.json found" -ForegroundColor Green
    } else {
        Write-Host "  ❌ package.json missing" -ForegroundColor Red
    }
    
    # Check if node_modules exists
    if (Test-Path "$($service.Path)/node_modules") {
        Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Dependencies missing - run npm install" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "==========================`n" -ForegroundColor Cyan
Write-Host "To start all services, run:" -ForegroundColor Yellow
Write-Host "  Terminal 1: cd backend/medusa && npm run dev" -ForegroundColor White
Write-Host "  Terminal 2: cd cms/payload && npm run dev" -ForegroundColor White
Write-Host "  Terminal 3: cd sync-service && npm run dev" -ForegroundColor White
Write-Host "  Terminal 4: cd frontend && npm run dev`n" -ForegroundColor White
