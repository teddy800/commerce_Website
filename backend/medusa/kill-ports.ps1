# Kill processes on ports 7001 and 9000
Write-Host "🔍 Finding processes on ports 7001 and 9000..." -ForegroundColor Cyan

# Find and kill process on port 7001
$port7001 = Get-NetTCPConnection -LocalPort 7001 -ErrorAction SilentlyContinue
if ($port7001) {
    $pid7001 = $port7001.OwningProcess
    Write-Host "Found process $pid7001 on port 7001" -ForegroundColor Yellow
    Stop-Process -Id $pid7001 -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Killed process on port 7001" -ForegroundColor Green
} else {
    Write-Host "✅ Port 7001 is already free" -ForegroundColor Green
}

# Find and kill process on port 9000
$port9000 = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($port9000) {
    $pid9000 = $port9000.OwningProcess
    Write-Host "Found process $pid9000 on port 9000" -ForegroundColor Yellow
    Stop-Process -Id $pid9000 -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Killed process on port 9000" -ForegroundColor Green
} else {
    Write-Host "✅ Port 9000 is already free" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 All ports cleared!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Now run: npm run dev" -ForegroundColor Cyan
