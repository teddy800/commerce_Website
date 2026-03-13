# Kill processes using Medusa ports
Write-Host "🔧 Killing processes on Medusa ports..." -ForegroundColor Yellow

# Kill process on port 9000 (Medusa API)
$process9000 = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($process9000) {
    Write-Host "Killing process on port 9000: $process9000" -ForegroundColor Cyan
    Stop-Process -Id $process9000 -Force
}

# Kill process on port 7001 (Medusa Admin)
$process7001 = Get-NetTCPConnection -LocalPort 7001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($process7001) {
    Write-Host "Killing process on port 7001: $process7001" -ForegroundColor Cyan
    Stop-Process -Id $process7001 -Force
}

Write-Host "✅ Medusa ports cleared!" -ForegroundColor Green
Write-Host ""
Write-Host "Now restart Medusa with:" -ForegroundColor Yellow
Write-Host "cd backend/medusa" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor Cyan