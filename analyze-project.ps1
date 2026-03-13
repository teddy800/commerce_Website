# COMPREHENSIVE PROJECT ANALYSIS
Write-Host "`n🔍 ANALYZING PROJECT..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$issues = @()
$warnings = @()
$success = @()

# 1. Check Node Modules
Write-Host "[1/8] Checking dependencies..." -ForegroundColor Yellow
$dirs = @("frontend", "backend/medusa", "cms/payload", "sync-service")
foreach ($dir in $dirs) {
    if (Test-Path "$dir/node_modules") {
        $success += "✅ $dir dependencies installed"
    } else {
        $issues += "❌ $dir dependencies missing - Run: cd $dir && npm install"
    }
}

# 2. Check Environment Files
Write-Host "`n[2/8] Checking environment files..." -ForegroundColor Yellow
$envFiles = @(
    @{Path="backend/medusa/.env"; Required=$true},
    @{Path="cms/payload/.env"; Required=$true},
    @{Path="frontend/.env.local"; Required=$false}
)
foreach ($env in $envFiles) {
    if (Test-Path $env.Path) {
        $success += "✅ $($env.Path) exists"
    } else {
        if ($env.Required) {
            $issues += "❌ $($env.Path) missing"
        } else {
            $warnings += "⚠️  $($env.Path) missing (optional)"
        }
    }
}

# 3. Check Advanced Features Integration
Write-Host "`n[3/8] Checking advanced features integration..." -ForegroundColor Yellow
$globalsContent = Get-Content "frontend/app/globals.css" -Raw -ErrorAction SilentlyContinue
if ($globalsContent -match "@import '../styles/animations.css'") {
    $success += "✅ Animations CSS integrated"
} else {
    $issues += "❌ Animations CSS not integrated"
}

$layoutContent = Get-Content "frontend/app/layout.tsx" -Raw -ErrorAction SilentlyContinue
if ($layoutContent -match "ToastContainer") {
    $success += "✅ Toast notifications integrated"
} else {
    $issues += "❌ Toast notifications not integrated"
}

if ($layoutContent -match "manifest.json") {
    $success += "✅ PWA manifest linked"
} else {
    $warnings += "⚠️  PWA manifest not linked"
}

# 4. Check Critical Files
Write-Host "`n[4/8] Checking critical files..." -ForegroundColor Yellow
$criticalFiles = @(
    "frontend/app/page.tsx",
    "frontend/app/products/page.tsx",
    "frontend/components/layout/Header.tsx",
    "frontend/components/layout/Footer.tsx",
    "frontend/styles/animations.css",
    "frontend/components/common/Toast.tsx",
    "frontend/components/product/WishlistButton.tsx",
    "frontend/lib/store/wishlistStore.ts"
)
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        $success += "✅ $file exists"
    } else {
        $issues += "❌ $file missing"
    }
}

# 5. Check Package.json Scripts
Write-Host "`n[5/8] Checking npm scripts..." -ForegroundColor Yellow
$packageFiles = @(
    "frontend/package.json",
    "backend/medusa/package.json",
    "cms/payload/package.json"
)
foreach ($pkg in $packageFiles) {
    if (Test-Path $pkg) {
        $content = Get-Content $pkg -Raw | ConvertFrom-Json
        if ($content.scripts.dev) {
            $success += "✅ $pkg has dev script"
        } else {
            $issues += "❌ $pkg missing dev script"
        }
    }
}

# 6. Check Port Conflicts
Write-Host "`n[6/8] Checking for port conflicts..." -ForegroundColor Yellow
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
    $success += "✅ All ports available"
} else {
    $warnings += "⚠️  Ports in use: $($portsInUse -join ', ') - Run: .\start-all-services.ps1 to auto-fix"
}

# 7. Check Git Status
Write-Host "`n[7/8] Checking Git status..." -ForegroundColor Yellow
if (Test-Path ".git") {
    $success += "✅ Git repository initialized"
    try {
        $status = git status --porcelain 2>$null
        if ($status) {
            $warnings += "⚠️  Uncommitted changes detected"
        } else {
            $success += "✅ No uncommitted changes"
        }
    } catch {
        $warnings += "⚠️  Could not check git status"
    }
} else {
    $warnings += "⚠️  Git not initialized"
}

# 8. Check TypeScript Configuration
Write-Host "`n[8/8] Checking TypeScript configuration..." -ForegroundColor Yellow
if (Test-Path "frontend/tsconfig.json") {
    $success += "✅ TypeScript configured"
} else {
    $issues += "❌ TypeScript configuration missing"
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "ANALYSIS COMPLETE" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "✅ SUCCESS ($($success.Count)):" -ForegroundColor Green
foreach ($s in $success) {
    Write-Host "  $s" -ForegroundColor Green
}

if ($warnings.Count -gt 0) {
    Write-Host "`n⚠️  WARNINGS ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($w in $warnings) {
        Write-Host "  $w" -ForegroundColor Yellow
    }
}

if ($issues.Count -gt 0) {
    Write-Host "`n❌ ISSUES ($($issues.Count)):" -ForegroundColor Red
    foreach ($i in $issues) {
        Write-Host "  $i" -ForegroundColor Red
    }
    Write-Host "`n🔧 RECOMMENDED ACTIONS:" -ForegroundColor Yellow
    Write-Host "  1. Fix the issues listed above" -ForegroundColor White
    Write-Host "  2. Run: .\verify-integration.ps1" -ForegroundColor White
    Write-Host "  3. Run: .\start-all-services.ps1`n" -ForegroundColor White
} else {
    Write-Host "`n🎉 NO CRITICAL ISSUES FOUND!" -ForegroundColor Green
    Write-Host "`n🚀 READY TO START:" -ForegroundColor Yellow
    Write-Host "  Run: .\start-all-services.ps1`n" -ForegroundColor White
}

Write-Host "================================`n" -ForegroundColor Cyan

# Return status
if ($issues.Count -gt 0) {
    exit 1
} else {
    exit 0
}
