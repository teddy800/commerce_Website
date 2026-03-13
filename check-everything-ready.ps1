# CHECK IF EVERYTHING IS READY TO START
Write-Host "`n🔍 CHECKING PROJECT STATUS..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$allGood = $true

# Check 1: Node.js installed
Write-Host "[1/10] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js not found! Install from https://nodejs.org/" -ForegroundColor Red
    $allGood = $false
}

# Check 2: npm installed
Write-Host "`n[2/10] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  ✅ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ npm not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 3: Frontend directory exists
Write-Host "`n[3/10] Checking frontend directory..." -ForegroundColor Yellow
if (Test-Path "frontend") {
    Write-Host "  ✅ Frontend directory exists" -ForegroundColor Green
    
    # Check if node_modules exists
    if (Test-Path "frontend/node_modules") {
        Write-Host "  ✅ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Frontend dependencies not installed" -ForegroundColor Yellow
        Write-Host "     Run: cd frontend && npm install" -ForegroundColor Gray
    }
} else {
    Write-Host "  ❌ Frontend directory not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 4: Backend/Medusa directory exists
Write-Host "`n[4/10] Checking Medusa backend..." -ForegroundColor Yellow
if (Test-Path "backend/medusa") {
    Write-Host "  ✅ Medusa directory exists" -ForegroundColor Green
    
    # Check if node_modules exists
    if (Test-Path "backend/medusa/node_modules") {
        Write-Host "  ✅ Medusa dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Medusa dependencies not installed" -ForegroundColor Yellow
        Write-Host "     Run: cd backend/medusa && npm install" -ForegroundColor Gray
    }
    
    # Check .env file
    if (Test-Path "backend/medusa/.env") {
        Write-Host "  ✅ Medusa .env file exists" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Medusa .env file missing" -ForegroundColor Yellow
        Write-Host "     Copy from .env.example" -ForegroundColor Gray
    }
} else {
    Write-Host "  ❌ Medusa directory not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 5: CMS/Payload directory exists
Write-Host "`n[5/10] Checking Payload CMS..." -ForegroundColor Yellow
if (Test-Path "cms/payload") {
    Write-Host "  ✅ Payload directory exists" -ForegroundColor Green
    
    # Check if node_modules exists
    if (Test-Path "cms/payload/node_modules") {
        Write-Host "  ✅ Payload dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Payload dependencies not installed" -ForegroundColor Yellow
        Write-Host "     Run: cd cms/payload && npm install" -ForegroundColor Gray
    }
    
    # Check .env file
    if (Test-Path "cms/payload/.env") {
        Write-Host "  ✅ Payload .env file exists" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Payload .env file missing" -ForegroundColor Yellow
        Write-Host "     Copy from .env.example" -ForegroundColor Gray
    }
} else {
    Write-Host "  ❌ Payload directory not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 6: Sync service directory exists
Write-Host "`n[6/10] Checking Sync Service..." -ForegroundColor Yellow
if (Test-Path "sync-service") {
    Write-Host "  ✅ Sync service directory exists" -ForegroundColor Green
    
    # Check if node_modules exists
    if (Test-Path "sync-service/node_modules") {
        Write-Host "  ✅ Sync service dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Sync service dependencies not installed" -ForegroundColor Yellow
        Write-Host "     Run: cd sync-service && npm install" -ForegroundColor Gray
    }
} else {
    Write-Host "  ⚠️  Sync service directory not found (optional)" -ForegroundColor Yellow
}

# Check 7: Advanced features files
Write-Host "`n[7/10] Checking advanced features..." -ForegroundColor Yellow
$advancedFiles = @(
    "frontend/styles/animations.css",
    "frontend/components/common/Skeleton.tsx",
    "frontend/components/common/Toast.tsx",
    "frontend/components/product/SearchBar.tsx",
    "frontend/components/product/ProductQuickView.tsx",
    "frontend/components/product/ProductFilter.tsx",
    "frontend/components/product/WishlistButton.tsx",
    "frontend/lib/store/wishlistStore.ts",
    "frontend/app/wishlist/page.tsx",
    "frontend/app/sitemap.ts",
    "frontend/app/robots.ts",
    "frontend/public/manifest.json"
)

$missingFiles = 0
foreach ($file in $advancedFiles) {
    if (!(Test-Path $file)) {
        $missingFiles++
    }
}

if ($missingFiles -eq 0) {
    Write-Host "  ✅ All advanced features files present ($($advancedFiles.Count) files)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  $missingFiles advanced feature files missing" -ForegroundColor Yellow
}

# Check 8: Documentation files
Write-Host "`n[8/10] Checking documentation..." -ForegroundColor Yellow
$docFiles = @(
    "DO_THIS_NOW.md",
    "INTEGRATE_ADVANCED_FEATURES.md",
    "LEGENDARY_FEATURES_COMPLETE.md",
    "FINAL_REQUIREMENTS_VERIFICATION.md"
)

$missingDocs = 0
foreach ($file in $docFiles) {
    if (!(Test-Path $file)) {
        $missingDocs++
    }
}

if ($missingDocs -eq 0) {
    Write-Host "  ✅ All documentation files present" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  $missingDocs documentation files missing" -ForegroundColor Yellow
}

# Check 9: Port availability
Write-Host "`n[9/10] Checking port availability..." -ForegroundColor Yellow
$ports = @(3000, 3001, 7001, 9000)
$portsInUse = @()

foreach ($port in $ports) {
    try {
        $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connection) {
            $portsInUse += $port
        }
    } catch {
        # Port is free
    }
}

if ($portsInUse.Count -eq 0) {
    Write-Host "  ✅ All required ports are free (3000, 3001, 7001, 9000)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Ports in use: $($portsInUse -join ', ')" -ForegroundColor Yellow
    Write-Host "     Run: .\kill-medusa-ports.ps1 to free them" -ForegroundColor Gray
}

# Check 10: Git repository
Write-Host "`n[10/10] Checking Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  ✅ Git repository initialized" -ForegroundColor Green
    
    # Check if there are uncommitted changes
    try {
        $status = git status --porcelain
        if ($status) {
            Write-Host "  ⚠️  You have uncommitted changes" -ForegroundColor Yellow
            Write-Host "     Consider committing before deployment" -ForegroundColor Gray
        } else {
            Write-Host "  ✅ No uncommitted changes" -ForegroundColor Green
        }
    } catch {
        Write-Host "  ⚠️  Could not check git status" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠️  Git repository not initialized" -ForegroundColor Yellow
    Write-Host "     Run: git init" -ForegroundColor Gray
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "✅ PROJECT IS READY TO START!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "  1. Run: .\FINAL_MEDUSA_FIX_NOW.ps1" -ForegroundColor White
    Write-Host "  2. Follow: DO_THIS_NOW.md" -ForegroundColor White
    Write-Host "  3. Deploy and submit!`n" -ForegroundColor White
} else {
    Write-Host "⚠️  SOME ISSUES FOUND" -ForegroundColor Yellow
    Write-Host "`nPlease fix the issues marked with ❌ above" -ForegroundColor Yellow
    Write-Host "Then run this script again to verify`n" -ForegroundColor Yellow
}

# Quick action suggestions
Write-Host "================================" -ForegroundColor Cyan
Write-Host "QUICK ACTIONS" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Install all dependencies:" -ForegroundColor Yellow
Write-Host "  cd frontend && npm install" -ForegroundColor Gray
Write-Host "  cd ../backend/medusa && npm install" -ForegroundColor Gray
Write-Host "  cd ../cms/payload && npm install`n" -ForegroundColor Gray

Write-Host "Fix Medusa login:" -ForegroundColor Yellow
Write-Host "  .\FINAL_MEDUSA_FIX_NOW.ps1`n" -ForegroundColor Gray

Write-Host "Start all services:" -ForegroundColor Yellow
Write-Host "  Terminal 1: cd backend/medusa && npm run dev" -ForegroundColor Gray
Write-Host "  Terminal 2: cd cms/payload && npm run dev" -ForegroundColor Gray
Write-Host "  Terminal 3: cd frontend && npm run dev`n" -ForegroundColor Gray

Write-Host "================================`n" -ForegroundColor Cyan
