# Script to get your public IP address for MongoDB Atlas whitelisting

Write-Host "🔍 Getting your public IP address..." -ForegroundColor Cyan
Write-Host ""

try {
    $ip = (Invoke-WebRequest -Uri "https://api.ipify.org" -UseBasicParsing).Content
    Write-Host "✅ Your Public IP Address: $ip" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Steps to whitelist this IP in MongoDB Atlas:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://cloud.mongodb.com/" -ForegroundColor White
    Write-Host "2. Click 'Network Access' in the left sidebar" -ForegroundColor White
    Write-Host "3. Click 'Add IP Address' button" -ForegroundColor White
    Write-Host "4. Enter this IP: $ip" -ForegroundColor White
    Write-Host "5. Click 'Confirm'" -ForegroundColor White
    Write-Host ""
    Write-Host "⚡ Quick Fix (Allow All IPs for Development):" -ForegroundColor Yellow
    Write-Host "   Instead of step 4, enter: 0.0.0.0/0" -ForegroundColor White
    Write-Host ""
    
    # Copy IP to clipboard
    Set-Clipboard -Value $ip
    Write-Host "✅ IP address copied to clipboard!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error getting IP address: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Go to https://whatismyipaddress.com/ to find your IP" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
