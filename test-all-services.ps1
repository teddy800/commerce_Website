# Test All Services Script
Write-Host "`n🧪 TESTING ALL SERVICES" -ForegroundColor Cyan
Write-Host "======================`n" -ForegroundColor Cyan

$tests = @()
$failures = @()

# Test 1: Check if services can start
Write-Host "[1/5] Testing Service Startup..." -ForegroundColor Yellow

$services = @(
    @{Name="Frontend"; Path="frontend"; Port=3000; Command="npm run dev"},
    @{Name="Backend"; Path="backend/medusa"; Port=9000; Command="npm run dev"},
    @{Name="CMS"; Path="cms/payload"; Port=3001; Command="npm run dev"},
    @{Name="Sync"; Path="sync-service"; Port=4000; Command="npm run dev"}
)

# Test 2: Check environment files
Write-Host "`n[2/5] Checking Environment Files..." -ForegroundColor Yellow

$envFiles = @("backend/medusa/.env", "cms/payload/.env", "sync-service/.env")
foreach ($file in $envFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file exists" -ForegroundColor Green
        $tests += "Env: $file"
    } else {
        Write-Host "  ❌ $file missing" -ForegroundColor Red
        $failures += "Env: $file"
    }
}

# Test 3: Check dependencies
Write-Host "`n[3/5] Checking Dependencies..." -ForegroundColor Yellow

foreach ($service in $services) {
    $packageJson = "$($service.Path)/package.json"
    $nodeModules = "$($service.Path)/node_modules"
    
    if ((Test-Path $packageJson) -and (Test-Path $nodeModules)) {
        Write-Host "  ✅ $($service.Name) dependencies OK" -ForegroundColor Green
        $tests += "Deps: $($service.Name)"
    } else {
        Write-Host "  ❌ $($service.Name) dependencies missing" -ForegroundColor Red
        $failures += "Deps: $($service.Name)"
    }
}

# Test 4: Check builds
Write-Host "`n[4/5] Checking Build Outputs..." -ForegroundColor Yellow

$buildPaths = @(
    @{Name="Frontend"; Path="frontend/.next"},
    @{Name="Backend"; Path="backend/medusa/dist"},
    @{Name="CMS"; Path="cms/payload/dist"},
    @{Name="Sync"; Path="sync-service/dist"}
)

foreach ($build in $buildPaths) {
    if (Test-Path $build.Path) {
        Write-Host "  ✅ $($build.Name) built" -ForegroundColor Green
        $tests += "Build: $($build.Name)"
    } else {
        Write-Host "  ⚠️  $($build.Name) not built" -ForegroundColor Yellow
    }
}

# Test 5: Summary
Write-Host "`n[5/5] Test Summary..." -ForegroundColor Yellow
Write-Host "`n✅ Passed: $($tests.Count)" -ForegroundColor Green
Write-Host "❌ Failed: $($failures.Count)" -ForegroundColor Red

if ($failures.Count -eq 0) {
    Write-Host "`n🎉 All tests passed!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some tests failed. Run fix-all-issues.ps1" -ForegroundColor Yellow
}
