# KILL MEDUSA PORTS (7001 and 9000)
Write-Host "`n🔪 Killing processes on Medusa ports..." -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$ports = @(7001, 9000)
$killedAny = $false

foreach ($port in $ports) {
    Write-Host "Checking port $port..." -ForegroundColor Yellow
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connections) {
            foreach ($conn in $connections) {
                $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
                if ($process) {
                    Write-Host "  Found: $($process.Name) (PID: $($process.Id))" -ForegroundColor Gray
                    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
                    Write-Host "  ✅ Killed process on port $port" -ForegroundColor Green
                    $killedAny = $true
                }
            }
        } else {
            Write-Host "  ✅ Port $port is free" -ForegroundColor Green
        }
    } catch {
        Write-Host "  ⚠️  Could not check port $port" -ForegroundColor Yellow
    }
}

Write-Host ""

if ($killedAny) {
    Write-Host "✅ Processes killed. Waiting 3 seconds for cleanup..." -ForegroundColor Green
    Start-Sleep -Seconds 3
    Write-Host "✅ Ready! You can now start Medusa.`n" -ForegroundColor Green
} else {
    Write-Host "✅ No processes to kill. Ports are free.`n" -ForegroundColor Green
}

Write-Host "To start Medusa:" -ForegroundColor Yellow
Write-Host "  cd backend/medusa" -ForegroundColor Gray
Write-Host "  npm run dev`n" -ForegroundColor Gray
