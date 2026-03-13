# FIX ALL POTENTIAL ISSUES
Write-Host "`n🔧 FIXING POTENTIAL ISSUES..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

$fixed = @()
$skipped = @()

# 1. Create frontend .env.local if missing
Write-Host "[1/5] Checking frontend environment..." -ForegroundColor Yellow
if (!(Test-Path "frontend/.env.local")) {
    @"
# Frontend Environment Variables
NEXT_PUBLIC_MEDUSA_API_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001
REVALIDATE_SECRET=your-secret-key-here
"@ | Out-File -FilePath "frontend/.env.local" -Encoding UTF8
    $fixed += "✅ Created frontend/.env.local"
} else {
    $skipped += "⏭️  frontend/.env.local already exists"
}

# 2. Ensure animations are imported
Write-Host "`n[2/5] Verifying animations integration..." -ForegroundColor Yellow
$globalsPath = "frontend/app/globals.css"
$globalsContent = Get-Content $globalsPath -Raw
if ($globalsContent -notmatch "@import '../styles/animations.css'") {
    $newContent = "@import '../styles/animations.css';`n`n" + $globalsContent
    Set-Content -Path $globalsPath -Value $newContent
    $fixed += "✅ Added animations import to globals.css"
} else {
    $skipped += "⏭️  Animations already imported"
}

# 3. Clear Next.js cache
Write-Host "`n[3/5] Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path "frontend/.next") {
    Remove-Item -Path "frontend/.next" -Recurse -Force -ErrorAction SilentlyContinue
    $fixed += "✅ Cleared Next.js cache"
} else {
    $skipped += "⏭️  No Next.js cache to clear"
}

# 4. Kill processes on required ports
Write-Host "`n[4/5] Freeing up ports..." -ForegroundColor Yellow
$ports = @(3000, 3001, 7001, 9000)
$killedPorts = @()
foreach ($port in $ports) {
    try {
        $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
        if ($process) {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
            $killedPorts += $port
        }
    } catch {
        # Port is already free
    }
}
if ($killedPorts.Count -gt 0) {
    $fixed += "✅ Freed ports: $($killedPorts -join ', ')"
} else {
    $skipped += "⏭️  All ports already free"
}

# 5. Create .gitignore if missing
Write-Host "`n[5/5] Checking .gitignore..." -ForegroundColor Yellow
if (!(Test-Path ".gitignore")) {
    @"
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
*.pem
.cache/
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    $fixed += "✅ Created .gitignore"
} else {
    $skipped += "⏭️  .gitignore already exists"
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "FIX COMPLETE" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

if ($fixed.Count -gt 0) {
    Write-Host "✅ FIXED ($($fixed.Count)):" -ForegroundColor Green
    foreach ($f in $fixed) {
        Write-Host "  $f" -ForegroundColor Green
    }
}

if ($skipped.Count -gt 0) {
    Write-Host "`n⏭️  SKIPPED ($($skipped.Count)):" -ForegroundColor Gray
    foreach ($s in $skipped) {
        Write-Host "  $s" -ForegroundColor Gray
    }
}

Write-Host "`n🎉 ALL POTENTIAL ISSUES FIXED!" -ForegroundColor Green
Write-Host "`n🚀 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "  1. Run: .\start-all-services.ps1" -ForegroundColor White
Write-Host "  2. Wait 30-60 seconds for services to start" -ForegroundColor White
Write-Host "  3. Visit: http://localhost:3000" -ForegroundColor White
Write-Host "  4. Hard refresh: Ctrl+Shift+R`n" -ForegroundColor White

Write-Host "================================`n" -ForegroundColor Cyan
