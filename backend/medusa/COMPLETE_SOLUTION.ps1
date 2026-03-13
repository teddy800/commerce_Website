# COMPLETE MEDUSA AUTHENTICATION SOLUTION
Write-Host "`n🔧 COMPLETE MEDUSA AUTHENTICATION SOLUTION" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check Medusa version first
Write-Host "Checking Medusa version...`n" -ForegroundColor Yellow
node check-medusa-version.js
Write-Host ""

Write-Host "==========================================`n" -ForegroundColor Cyan
Write-Host "Choose your approach:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Try Setup Wizard (delete users + fresh start)" -ForegroundColor White
Write-Host "2. Create user via CLI (npx medusa user)" -ForegroundColor White
Write-Host "3. Create user via API (while Medusa is running)" -ForegroundColor White
Write-Host "4. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n🧙 Triggering Setup Wizard...`n" -ForegroundColor Cyan
        .\trigger-setup-wizard.ps1
    }
    "2" {
        Write-Host "`n👤 Creating user via CLI...`n" -ForegroundColor Cyan
        
        # Stop processes
        Write-Host "Stopping Node processes..." -ForegroundColor Yellow
        Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        
        # Delete existing users
        Write-Host "Clearing existing users..." -ForegroundColor Yellow
        node -e "
        const { Client } = require('pg');
        require('dotenv').config();
        (async () => {
          const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
          });
          try {
            await client.connect();
            await client.query('DELETE FROM \"user\"');
            console.log('✅ Users cleared');
          } catch (e) {
            console.error('Error:', e.message);
          } finally {
            await client.end();
          }
        })();
        "
        Start-Sleep -Seconds 2
        Write-Host ""
        
        # Create user
        Write-Host "Creating admin user..." -ForegroundColor Yellow
        npx medusa user -e admin@medusa.com -p admin123
        Write-Host ""
        
        # Start Medusa
        Write-Host "Starting Medusa..." -ForegroundColor Green
        Write-Host ""
        Write-Host "📧 Email:    admin@medusa.com" -ForegroundColor Cyan
        Write-Host "🔑 Password: admin123" -ForegroundColor Cyan
        Write-Host "🌐 URL:      http://localhost:7001`n" -ForegroundColor Cyan
        
        npm run dev
    }
    "3" {
        Write-Host "`n🔌 Creating user via API...`n" -ForegroundColor Cyan
        Write-Host "First, start Medusa in another terminal:" -ForegroundColor Yellow
        Write-Host "  cd backend/medusa" -ForegroundColor Gray
        Write-Host "  npm run dev`n" -ForegroundColor Gray
        Write-Host "Then press ENTER here to create the user..." -ForegroundColor Yellow
        $null = Read-Host
        
        node create-admin-via-medusa-api.js
    }
    "4" {
        Write-Host "`nExiting...`n" -ForegroundColor Gray
        exit
    }
    default {
        Write-Host "`n❌ Invalid choice. Please run the script again.`n" -ForegroundColor Red
    }
}
