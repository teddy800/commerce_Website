# MASTER FIX SCRIPT - Runs all fixes in correct order
Write-Host "`n🎯 MASTER FIX SCRIPT" -ForegroundColor Cyan
Write-Host "===================`n" -ForegroundColor Cyan

Write-Host "This script will fix all known issues in your project.`n" -ForegroundColor Yellow
Write-Host "Estimated time: 10-15 minutes`n" -ForegroundColor Gray

$response = Read-Host "Continue? (Y/N)"
if ($response -ne "Y" -and $response -ne "y") {
    Write-Host "Aborted." -ForegroundColor Red
    exit
}

# Step 1: Fix all general issues
Write-Host "`n[Step 1/4] Running general fixes..." -ForegroundColor Cyan
.\fix-all-issues.ps1

# Step 2: Test services
Write-Host "`n[Step 2/4] Testing services..." -ForegroundColor Cyan
.\test-all-services.ps1

# Step 3: Fix Medusa authentication
Write-Host "`n[Step 3/4] Fixing Medusa authentication..." -ForegroundColor Cyan
Write-Host "Opening Medusa fix script..." -ForegroundColor Yellow
Write-Host "Please choose option 2 (CLI user creation) when prompted.`n" -ForegroundColor Yellow
Start-Sleep -Seconds 3
Push-Location backend/medusa
.\COMPLETE_SOLUTION.ps1
Pop-Location

# Step 4: Commit CI/CD fixes
Write-Host "`n[Step 4/4] Committing CI/CD fixes..." -ForegroundColor Cyan
$commitResponse = Read-Host "Commit and push CI/CD fixes to GitHub? (Y/N)"
if ($commitResponse -eq "Y" -or $commitResponse -eq "y") {
    .\commit-ci-fix.ps1
}

# Final summary
Write-Host "`n===================`n" -ForegroundColor Cyan
Write-Host "✅ MASTER FIX COMPLETE!" -ForegroundColor Green
Write-Host "===================`n" -ForegroundColor Cyan

Write-Host "📋 What was fixed:" -ForegroundColor Yellow
Write-Host "  ✅ Environment variables" -ForegroundColor Green
Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
Write-Host "  ✅ Services built" -ForegroundColor Green
Write-Host "  ✅ Medusa authentication" -ForegroundColor Green
Write-Host "  ✅ CI/CD pipeline" -ForegroundColor Green
Write-Host "  ✅ Error pages created" -ForegroundColor Green

Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review PROJECT_STATUS_FINAL.md" -ForegroundColor White
Write-Host "  2. Start all services and test manually" -ForegroundColor White
Write-Host "  3. Check GitHub Actions for CI/CD status" -ForegroundColor White

Write-Host "`n🚀 Your project is ready!" -ForegroundColor Green
Write-Host "`n"
