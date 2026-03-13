# Simple fix using Medusa's built-in CLI
Write-Host "`n🔧 MEDUSA AUTHENTICATION FIX" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

# Kill all Node processes
Write-Host "Stopping all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✅ Processes stopped`n" -ForegroundColor Green

# Create admin user using Medusa CLI
Write-Host "Creating admin user..." -ForegroundColor Yellow
Write-Host "(This will show an error if user exists - that's OK)`n" -ForegroundColor Gray

npx medusa user -e admin@medusa.com -p admin123

Write-Host "`n✅ User creation attempted`n" -ForegroundColor Green

# Start Medusa
Write-Host "============================`n" -ForegroundColor Cyan
Write-Host "🚀 Starting Medusa...`n" -ForegroundColor Green
Write-Host "📧 Email:    admin@medusa.com" -ForegroundColor Cyan
Write-Host "🔑 Password: admin123" -ForegroundColor Cyan
Write-Host "🌐 URL:      http://localhost:7001`n" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

npm run dev
