# Testing Guide

Comprehensive guide for testing the Cards Against Humanity E-commerce Platform.

## Testing Checklist

### Frontend Testing

#### Homepage
- [ ] Homepage loads without errors
- [ ] Hero section displays correctly
- [ ] Featured products section shows products
- [ ] Content sections render properly
- [ ] Navigation menu works
- [ ] Footer displays correctly
- [ ] All links work
- [ ] Images load and are optimized
- [ ] Responsive on mobile, tablet, desktop

#### Product Pages
- [ ] Product list page loads
- [ ] Products display with images and prices
- [ ] Product detail page loads
- [ ] Product images display in gallery
- [ ] Image zoom works
- [ ] Variant selector works (if applicable)
- [ ] Add to cart button works
- [ ] Out of stock products show correctly
- [ ] Related products display
- [ ] SEO meta tags are correct

#### Shopping Cart
- [ ] Cart icon shows item count
- [ ] Cart drawer opens/closes
- [ ] Cart items display correctly
- [ ] Quantity can be updated
- [ ] Items can be removed
- [ ] Cart total calculates correctly
- [ ] Cart persists on page reload
- [ ] Empty cart shows appropriate message

#### Checkout
- [ ] Checkout page loads
- [ ] Shipping form validates correctly
- [ ] Billing form validates correctly
- [ ] Shipping method selector works
- [ ] Payment form accepts test card
- [ ] Order review shows correct information
- [ ] Order can be completed
- [ ] Order confirmation displays
- [ ] Cart clears after order

#### Authentication
- [ ] Registration form works
- [ ] Login form works
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] User session persists
- [ ] Account page shows user info
- [ ] Order history displays

### Backend Testing (Medusa)

#### API Endpoints
- [ ] GET /store/products returns products
- [ ] GET /store/products/:id returns single product
- [ ] POST /store/carts creates cart
- [ ] POST /store/carts/:id/line-items adds to cart
- [ ] POST /store/carts/:id/line-items/:line_id updates quantity
- [ ] DELETE /store/carts/:id/line-items/:line_id removes item
- [ ] POST /store/customers creates customer
- [ ] POST /store/auth authenticates customer
- [ ] POST /store/carts/:id/complete creates order

#### Admin Panel
- [ ] Admin panel loads at /app
- [ ] Can create products
- [ ] Can update products
- [ ] Can manage inventory
- [ ] Can view orders
- [ ] Can manage customers

### CMS Testing (Payload)

#### Admin Panel
- [ ] Admin panel loads at /admin
- [ ] Can create products
- [ ] Can upload images
- [ ] Can edit homepage content
- [ ] Can manage navigation
- [ ] Can manage footer content
- [ ] Media library works
- [ ] Rich text editor works

#### API Endpoints
- [ ] GET /api/products returns products
- [ ] GET /api/products/:id returns single product
- [ ] GET /api/homepage-content returns homepage data
- [ ] GET /api/navigation returns navigation items
- [ ] GET /api/footer-content returns footer data

### Sync Service Testing

#### CMS to Medusa Sync
- [ ] Creating product in CMS creates in Medusa
- [ ] Updating product in CMS updates in Medusa
- [ ] Product images sync correctly
- [ ] Product variants sync correctly
- [ ] Medusa ID is stored in CMS

#### Medusa to CMS Sync
- [ ] Updating inventory in Medusa updates CMS
- [ ] Updating price in Medusa updates CMS
- [ ] Out of stock status syncs correctly

### Performance Testing

#### Lighthouse Scores
Run Lighthouse audit on:
- [ ] Homepage: Performance 90+
- [ ] Homepage: Accessibility 90+
- [ ] Homepage: Best Practices 90+
- [ ] Homepage: SEO 90+
- [ ] Product page: Performance 90+
- [ ] Product page: Accessibility 90+
- [ ] Product page: Best Practices 90+
- [ ] Product page: SEO 90+

#### Load Times
- [ ] Homepage loads in < 2 seconds
- [ ] Product page loads in < 2 seconds
- [ ] Cart operations complete in < 1 second
- [ ] Checkout completes in < 3 seconds

#### Image Optimization
- [ ] Images are WebP format
- [ ] Images have appropriate sizes
- [ ] Images lazy load below fold
- [ ] Images have blur placeholders

### Accessibility Testing

#### Keyboard Navigation
- [ ] Can navigate entire site with keyboard
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Skip to content link works

#### Screen Reader
- [ ] All images have alt text
- [ ] Form labels are associated
- [ ] ARIA labels are present where needed
- [ ] Semantic HTML is used

#### Color Contrast
- [ ] Text has sufficient contrast
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators have sufficient contrast

### Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Device Testing

Test on:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile (320x568)

### Error Handling

#### Network Errors
- [ ] API errors show user-friendly messages
- [ ] Failed requests retry automatically
- [ ] Timeout errors are handled
- [ ] Offline state is handled

#### Form Validation
- [ ] Required fields show errors
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Credit card validation works
- [ ] Error messages are clear

#### Edge Cases
- [ ] Empty cart shows appropriate message
- [ ] Out of stock products can't be added
- [ ] Invalid product IDs show 404
- [ ] Invalid routes show 404
- [ ] Expired sessions redirect to login

## Test Data

### Test Credit Cards (Stripe Test Mode)

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Test User Accounts

```
Email: test@example.com
Password: Test123!
```

## Automated Testing

### Unit Tests

```bash
cd frontend
npm run test
```

### E2E Tests

```bash
cd frontend
npm run test:e2e
```

### Integration Tests

```bash
cd backend/medusa
npm run test
```

## Performance Testing Tools

### Lighthouse
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-site.com --view
```

### WebPageTest
Visit [webpagetest.org](https://www.webpagetest.org) and enter your URL

### Chrome DevTools
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Generate report"

## Load Testing

### Apache Bench
```bash
# Install Apache Bench
# macOS: brew install httpd
# Ubuntu: sudo apt-get install apache2-utils

# Run load test (100 requests, 10 concurrent)
ab -n 100 -c 10 https://your-site.com/
```

### Artillery
```bash
# Install Artillery
npm install -g artillery

# Run load test
artillery quick --count 10 --num 100 https://your-site.com/
```

## Security Testing

### OWASP ZAP
1. Download [OWASP ZAP](https://www.zaproxy.org/)
2. Run automated scan
3. Review findings

### SSL Labs
Visit [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) and enter your domain

## Monitoring

### Vercel Analytics
- View real-time analytics
- Monitor Core Web Vitals
- Track page views

### Sentry (Error Tracking)
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
```

### LogRocket (Session Replay)
```bash
# Install LogRocket
npm install logrocket

# Initialize in app
```

## Continuous Testing

### GitHub Actions
- Automated tests run on every push
- Lighthouse CI runs on PRs
- Type checking runs on every commit

### Pre-commit Hooks
```bash
# Install Husky
npm install -D husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

## Bug Reporting

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots/videos
5. Browser and device info
6. Console errors
7. Network requests

## Testing Best Practices

1. Test on real devices, not just emulators
2. Test with slow network (3G)
3. Test with screen reader
4. Test with keyboard only
5. Test with different user roles
6. Test edge cases and error states
7. Test with real data, not just test data
8. Test the entire user journey
9. Test after every deployment
10. Monitor production for errors

## Checklist Before Submission

- [ ] All tests pass
- [ ] Lighthouse scores 90+
- [ ] No console errors
- [ ] No broken links
- [ ] All images load
- [ ] Forms validate correctly
- [ ] Checkout completes successfully
- [ ] Sync works bidirectionally
- [ ] Mobile responsive
- [ ] Accessible
- [ ] SEO optimized
- [ ] Performance optimized
- [ ] Error handling works
- [ ] Documentation complete

---

**Remember**: Testing is not a one-time activity. Continuously test throughout development and after deployment.
