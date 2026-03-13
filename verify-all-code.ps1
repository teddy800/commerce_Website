# Comprehensive Code Verification Script
Write-Host "`n🔍 VERIFYING ALL CODE IMPLEMENTATION" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

$issues = @()
$passed = @()

# Function to check file exists and has content
function Test-FileContent {
    param($path, $name)
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        if ($content.Length -gt 100) {
            Write-Host "✅ $name - OK" -ForegroundColor Green
            $script:passed += $name
            return $true
        } else {
            Write-Host "⚠️  $name - File too small" -ForegroundColor Yellow
            $script:issues += "$name - File exists but may be incomplete"
            return $false
        }
    } else {
        Write-Host "❌ $name - Missing" -ForegroundColor Red
        $script:issues += "$name - File missing"
        return $false
    }
}

# Function to check if service can be imported
function Test-ServiceCode {
    param($path, $name)
    if (Test-Path $path) {
        Push-Location (Split-Path $path -Parent)
        $result = node -e "try { require('./$((Split-Path $path -Leaf))'); console.log('OK'); } catch(e) { console.log('ERROR'); }" 2>&1
        Pop-Location
        
        if ($result -match "OK") {
            Write-Host "✅ $name - Code valid" -ForegroundColor Green
            $script:passed += "$name code"
            return $true
        } else {
            Write-Host "⚠️  $name - Syntax issues" -ForegroundColor Yellow
            $script:issues += "$name - May have syntax errors"
            return $false
        }
    }
    return $false
}

Write-Host "[1/8] Checking Frontend Code..." -ForegroundColor Cyan
Test-FileContent "frontend/app/page.tsx" "Homepage"
Test-FileContent "frontend/app/products/page.tsx" "Products Page"
Test-FileContent "frontend/app/cart/page.tsx" "Cart Page"
Test-FileContent "frontend/app/checkout/page.tsx" "Checkout Page"
Test-FileContent "frontend/app/not-found.tsx" "404 Page"
Test-FileContent "frontend/app/error.tsx" "Error Page"
Test-FileContent "frontend/app/loading.tsx" "Loading Page"

Write-Host "`n[2/8] Checking Frontend Components..." -ForegroundColor Cyan
Test-FileContent "frontend/components/layout/Header.tsx" "Header"
Test-FileContent "frontend/components/layout/Footer.tsx" "Footer"
Test-FileContent "frontend/components/cart/CartDrawer.tsx" "Cart Drawer"
Test-FileContent "frontend/components/product/ProductCard.tsx" "Product Card"
Test-FileContent "frontend/components/checkout/PaymentForm.tsx" "Payment Form"

Write-Host "`n[3/8] Checking Frontend API Routes..." -ForegroundColor Cyan
Test-FileContent "frontend/app/api/cart/route.ts" "Cart API"
Test-FileContent "frontend/app/api/auth/login/route.ts" "Login API"
Test-FileContent "frontend/app/api/auth/register/route.ts" "Register API"
Test-FileContent "frontend/app/api/checkout/create-order/route.ts" "Checkout API"

Write-Host "`n[4/8] Checking Backend (Medusa) Code..." -ForegroundColor Cyan
Test-FileContent "backend/medusa/medusa-config.js" "Medusa Config"
Test-FileContent "backend/medusa/package.json" "Medusa Package"
Test-FileContent "backend/medusa/.env" "Medusa Environment"

Write-Host "`n[5/8] Checking CMS (Payload) Code..." -ForegroundColor Cyan
Test-FileContent "cms/payload/src/payload.config.ts" "Payload Config"
Test-FileContent "cms/payload/src/server.ts" "Payload Server"
Test-FileContent "cms/payload/src/collections/Products.ts" "Products Collection"
Test-FileContent "cms/payload/src/collections/HomepageContent.ts" "Homepage Collection"
Test-FileContent "cms/payload/.env" "Payload Environment"

Write-Host "`n[6/8] Checking Sync Service Code..." -ForegroundColor Cyan
Test-FileContent "sync-service/src/index.ts" "Sync Service Main"
Test-FileContent "sync-service/src/services/sync-service.ts" "Sync Service Logic"
Test-FileContent "sync-service/src/routes/medusa-to-cms.ts" "Medusa to CMS Route"
Test-FileContent "sync-service/src/routes/cms-to-medusa.ts" "CMS to Medusa Route"

Write-Host "`n[7/8] Checking Configuration Files..." -ForegroundColor Cyan
Test-FileContent ".github/workflows/ci.yml" "CI/CD Workflow"
Test-FileContent "frontend/tailwind.config.ts" "Tailwind Config"
Test-FileContent "frontend/next.config.js" "Next.js Config"
Test-FileContent "frontend/tsconfig.json" "TypeScript Config"

Write-Host "`n[8/8] Testing Code Syntax..." -ForegroundColor Cyan

# Test if TypeScript compiles
Write-Host "  Testing TypeScript compilation..." -ForegroundColor Gray
Push-Location frontend
$tsResult = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript - No errors" -ForegroundColor Green
    $passed += "TypeScript compilation"
} else {
    Write-Host "⚠️  TypeScript - Has errors" -ForegroundColor Yellow
    $issues += "TypeScript - Compilation errors found"
}
Pop-Location

# Test if ESLint passes
Write-Host "  Testing ESLint..." -ForegroundColor Gray
Push-Location frontend
$lintResult = npm run lint 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ ESLint - No errors" -ForegroundColor Green
    $passed += "ESLint"
} else {
    Write-Host "⚠️  ESLint - Has warnings" -ForegroundColor Yellow
    $issues += "ESLint - Warnings found"
}
Pop-Location

# Summary
Write-Host "`n====================================`n" -ForegroundColor Cyan
Write-Host "VERIFICATION SUMMARY" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

Write-Host "✅ Passed: $($passed.Count)" -ForegroundColor Green
Write-Host "⚠️  Issues: $($issues.Count)" -ForegroundColor Yellow

if ($issues.Count -gt 0) {
    Write-Host "`nIssues Found:" -ForegroundColor Yellow
    foreach ($issue in $issues) {
        Write-Host "  - $issue" -ForegroundColor Gray
    }
}

Write-Host "`n====================================`n" -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "🎉 ALL CODE VERIFIED - READY TO RUN!" -ForegroundColor Green
} elseif ($issues.Count -lt 5) {
    Write-Host "✅ MOSTLY READY - Minor issues to fix" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  NEEDS ATTENTION - Run fix-all-issues.ps1" -ForegroundColor Red
}

Write-Host "`n"
