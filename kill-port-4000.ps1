# Kill process using port 4000
Write-Host "Finding process using port 4000..." -ForegroundColor Yellow

$process = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1

if ($process) {
    Write-Host "Found process ID: $process" -ForegroundColor Cyan
    Stop-Process -Id $process -Force
    Write-Host "✅ Process killed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now you can start the sync service with:" -ForegroundColor Yellow
    Write-Host "cd sync-service" -ForegroundColor Cyan
    Write-Host "npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "❌ No process found using port 4000" -ForegroundColor Red
}
