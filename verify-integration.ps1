# Verify Advanced Features Integration
Write-Host "`n✨ VERIFYING ADVANCED FEATURES INTEGRATION..." -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

$allGood = $true

# Check 1: Animations CSS imported in globals.css
Write-Host "[1/5] Checking animations import..." -ForegroundColor Yellow
$globalsContent = Get-Content "frontend/app/globals.css" -Raw
if ($globalsContent -match "@import '../styles/animations.css'") {
    Write-Host "  ✅ Animations CSS imported in globals.css" -ForegroundColor Green
} else {
    Write-Host "  ❌ Animations CSS NOT imported" -ForegroundColor Red
    $allGood = $false
}

# Check 2: Toast Container in layout.tsx
Write-Host "`n[2/5] Checking Toast Container..." -ForegroundColor Yellow
$layoutContent = Get-Content "frontend/app/layout.tsx" -Raw
if ($layoutContent -match "ToastContainer") {
    Write-Host "  ✅ Toast Container added to layout" -ForegroundColor Green
} else {
    Write-Host "  ❌ Toast Container NOT added" -ForegroundColor Red
    $allGood = $false
}

# Check 3: Manifest link in layout.tsx
Write-Host "`n[3/5] Checking PWA Manifest..." -ForegroundColor Yellow
if ($layoutContent -match 'manifest.json') {
    Write-Host "  ✅ PWA Manifest linked in layout" -ForegroundColor Green
} else {
    Write-Host "  ❌ PWA Manifest NOT linked" -ForegroundColor Red
    $allGood = $false
}

# Check 4: WishlistButton in ProductCard
Write-Host "`n[4/5] Checking Wishlist integration..." -ForegroundColor Yellow
$productCardContent = Get-Content "frontend/components/product/ProductCard.tsx" -Raw
if ($productCardContent -match "WishlistButton") {
    Write-Host "  ✅ Wishlist button integrated in ProductCard" -ForegroundColor Green
} else {
    Write-Host "  ❌ Wishlist button NOT integrated" -ForegroundColor Red
    $allGood = $false
}

# Check 5: Toast in AddToCart
Write-Host "`n[5/5] Checking Toast notifications..." -ForegroundColor Yellow
$addToCartContent = Get-Content "frontend/components/product/AddToCart.tsx" -Raw
if ($addToCartContent -match "showToast") {
    Write-Host "  ✅ Toast notifications integrated in AddToCart" -ForegroundColor Green
} else {
    Write-Host "  ❌ Toast notifications NOT integrated" -ForegroundColor Red
    $allGood = $false
}

# Summary
Write-Host "`n================================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "✅ ALL ADVANCED FEATURES INTEGRATED!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "  1. Restart your frontend server (Ctrl+C then npm run dev)" -ForegroundColor White
    Write-Host "  2. Hard refresh browser (Ctrl+Shift+R)" -ForegroundColor White
    Write-Host "  3. Visit http://localhost:3000" -ForegroundColor White
    Write-Host "`nYou should now see:" -ForegroundColor Cyan
    Write-Host "  ✨ Smooth animations on page load" -ForegroundColor White
    Write-Host "  💫 Hover effects on product cards" -ForegroundColor White
    Write-Host "  ❤️  Wishlist buttons on products" -ForegroundColor White
    Write-Host "  🔔 Toast notifications when adding to cart" -ForegroundColor White
    Write-Host "  🎯 Enhanced hero section with animations`n" -ForegroundColor White
} else {
    Write-Host "⚠️  SOME FEATURES NOT INTEGRATED" -ForegroundColor Yellow
    Write-Host "`nPlease check the errors above`n" -ForegroundColor Yellow
}

Write-Host "================================================`n" -ForegroundColor Cyan
