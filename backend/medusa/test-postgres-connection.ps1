# PostgreSQL Connection Tester
# This script helps you find the correct PostgreSQL password

Write-Host "=== PostgreSQL Connection Tester ===" -ForegroundColor Cyan
Write-Host ""

# Test common passwords
$passwords = @("postgres", "admin", "root", "password", "123456")

Write-Host "Testing common passwords..." -ForegroundColor Yellow
Write-Host ""

foreach ($pwd in $passwords) {
    Write-Host "Testing password: $pwd" -ForegroundColor White
    
    $env:PGPASSWORD = $pwd
    $result = psql -U postgres -d postgres -c "SELECT version();" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SUCCESS! Password is: $pwd" -ForegroundColor Green
        Write-Host ""
        Write-Host "Update your .env file with:" -ForegroundColor Cyan
        Write-Host "DATABASE_URL=postgresql://postgres:$pwd@localhost:5432/medusa_db" -ForegroundColor Yellow
        Write-Host ""
        
        # Ask if user wants to update .env automatically
        $update = Read-Host "Do you want to update .env file automatically? (y/n)"
        if ($update -eq "y" -or $update -eq "Y") {
            $envContent = Get-Content ".env" -Raw
            $envContent = $envContent -replace "postgresql://postgres:YOUR_PASSWORD@localhost:5432/medusa_db", "postgresql://postgres:$pwd@localhost:5432/medusa_db"
            Set-Content ".env" -Value $envContent
            Write-Host "✅ .env file updated!" -ForegroundColor Green
        }
        
        exit 0
    }
}

Write-Host ""
Write-Host "❌ None of the common passwords worked." -ForegroundColor Red
Write-Host ""
Write-Host "Please try one of these options:" -ForegroundColor Yellow
Write-Host "1. Remember the password you set during PostgreSQL installation"
Write-Host "2. Reset your PostgreSQL password (see FIX_DATABASE_PASSWORD.md)"
Write-Host "3. Check if PostgreSQL is using Windows authentication (no password)"
Write-Host ""
Write-Host "To test manually, run:" -ForegroundColor Cyan
Write-Host "psql -U postgres -d postgres" -ForegroundColor White
Write-Host ""
