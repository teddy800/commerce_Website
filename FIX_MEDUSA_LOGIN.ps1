# ONE-COMMAND FIX FOR MEDUSA LOGIN
Write-Host "`n🔐 FIXING MEDUSA ADMIN LOGIN..." -ForegroundColor Cyan
Write-Host "==============================`n" -ForegroundColor Cyan

Push-Location backend/medusa
.\FIX_MEDUSA_AUTH_FINAL.ps1
Pop-Location
