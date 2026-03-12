# Troubleshooting Guide

Common issues and their solutions.

## 🔧 Installation Issues

### Problem: `npm install` fails
**Symptoms:**
- Error messages during installation
- Missing dependencies
- Permission errors

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If permission errors (Linux/Mac)
sudo npm install -g npm@latest

# Use Node 18+
node --version  # Should be 18.0.0 or higher
```

### Problem: Port already in use
**Symptoms:**
- "Port 3000 is already in use"
- "EADDRINUSE"

**Solutions:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or find and kill manually
# Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 🗄️ Database Issues

### Problem: MongoDB connection failed
**Symptoms:**
- "MongoNetworkError"
- "Connection refused"

**Solutions:**
```bash
# Check if MongoDB is running
# Mac:
brew services list
brew services start mongodb-community

# Ubuntu:
sudo systemctl status mongodb
sudo systemctl start mongodb

# Or use MongoDB Atlas (cloud)
# Get connection string from atlas.mongodb.com
```

### Problem: PostgreSQL connection failed
**Symptoms:**
- "Connection refused"
- "ECONNREFUSED"

**Solutions:**
```bash
# Check if PostgreSQL is running
# Mac:
brew services list
brew services start postgresql

# Ubuntu:
sudo systemctl status postgresql
sudo systemctl start postgresql

# Check connection string in .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## 🎨 Frontend Issues

### Problem: Page not found (404)
**Symptoms:**
- 404 error on routes
- Pages don't load

**Solutions:**
```bash
# Check file structure
ls frontend/app/

# Restart dev server
cd frontend
npm run dev

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Problem: Styles not loading
**Symptoms:**
- No styling
- Plain HTML

**Solutions:**
```bash
# Check Tailwind config
cat frontend/tailwind.config.ts

# Rebuild
cd frontend
npm run build
npm run dev

# Check globals.css is imported in layout.tsx
```

### Problem: Images not loading
**Symptoms:**
- Broken image icons
- 404 for images

**Solutions:**
```typescript
// Check next.config.js has image domains
module.exports = {
  images: {
    domains: ['localhost', 'your-cms-domain.com'],
  },
}

// Use correct image path
<Image src="/images/logo.png" alt="Logo" width={100} height={100} />
```

## 🔌 API Issues

### Problem: API calls failing
**Symptoms:**
- "Failed to fetch"
- CORS errors
- 500 errors

**Solutions:**
```bash
# Check environment variables
cat frontend/.env.local

# Should have:
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001

# Check services are running
curl http://localhost:3001/api/products
curl http://localhost:9000/store/products

# Check CORS in backend
# medusa-config.js should have:
module.exports = {
  projectConfig: {
    cors: "http://localhost:3000",
  },
}
```

### Problem: CMS API returns empty
**Symptoms:**
- No products
- Empty arrays

**Solutions:**
```bash
# Check CMS has data
# Log in to http://localhost:3001/admin
# Create some products

# Check API directly
curl http://localhost:3001/api/products

# Check collection is public
# In Products.ts:
access: {
  read: () => true,
}
```

## 🛒 Cart Issues

### Problem: Cart not persisting
**Symptoms:**
- Cart empties on refresh
- Items disappear

**Solutions:**
```typescript
// Check localStorage is working
console.log(localStorage.getItem('cart_id'));

// Check cartStore.ts
// Should save to localStorage:
localStorage.setItem('cart_id', cartId);

// Check browser allows localStorage
// Try in incognito mode
```

### Problem: Add to cart not working
**Symptoms:**
- Button doesn't respond
- No items added

**Solutions:**
```typescript
// Check console for errors
// Open DevTools > Console

// Check Medusa is running
curl http://localhost:9000/store/carts

// Check variant ID is correct
console.log('Variant ID:', variantId);

// Test API directly
curl -X POST http://localhost:9000/store/carts \
  -H "Content-Type: application/json"
```

## 🔐 Authentication Issues

### Problem: Login not working
**Symptoms:**
- "Invalid credentials"
- Login fails

**Solutions:**
```bash
# Check Medusa is running
curl http://localhost:9000/store/auth

# Create test user
cd backend
npx medusa user -e test@example.com -p password123

# Check credentials
# Email: test@example.com
# Password: password123

# Check JWT_SECRET in backend/.env
JWT_SECRET=your-secret-here
```

### Problem: Session not persisting
**Symptoms:**
- Logged out on refresh
- Session expires immediately

**Solutions:**
```typescript
// Check cookies are being set
// DevTools > Application > Cookies

// Check cookie settings in API route
res.cookies.set('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 7 days
});
```

## 🚀 Deployment Issues

### Problem: Vercel build fails
**Symptoms:**
- Build errors
- Deployment fails

**Solutions:**
```bash
# Test build locally
cd frontend
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Check environment variables in Vercel
# Go to Project Settings > Environment Variables
```

### Problem: Environment variables not working
**Symptoms:**
- API calls fail in production
- Undefined variables

**Solutions:**
```bash
# Check Vercel environment variables
# Must start with NEXT_PUBLIC_ for client-side

# Correct:
NEXT_PUBLIC_MEDUSA_URL=https://your-backend.onrender.com

# Wrong:
MEDUSA_URL=https://your-backend.onrender.com

# Redeploy after adding variables
```

### Problem: Render deployment fails
**Symptoms:**
- Build fails
- Service won't start

**Solutions:**
```bash
# Check build command
npm install && npm run build

# Check start command
npm run start

# Check Node version
# Should be 18+

# Check environment variables
# All secrets should be set

# Check logs in Render dashboard
```

## 📊 Performance Issues

### Problem: Slow page loads
**Symptoms:**
- Pages take long to load
- Low Lighthouse scores

**Solutions:**
```typescript
// Check image optimization
// Use next/image everywhere
<Image src="..." alt="..." width={500} height={500} />

// Check ISR is configured
export const revalidate = 300; // 5 minutes

// Check bundle size
npm run build
# Look for large chunks

// Use dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

### Problem: Low Lighthouse scores
**Symptoms:**
- Scores below 90
- Performance warnings

**Solutions:**
```bash
# Run Lighthouse locally
lighthouse http://localhost:3000 --view

# Common fixes:
# 1. Optimize images (use WebP)
# 2. Remove unused CSS
# 3. Minimize JavaScript
# 4. Enable caching
# 5. Use CDN

# Check specific issues in report
```

## 🔄 Sync Issues

### Problem: Products not syncing
**Symptoms:**
- CMS changes don't appear in Medusa
- Inventory not updating

**Solutions:**
```bash
# Check sync service is running
curl http://localhost:3002/health

# Check webhooks are configured
# In CMS: Settings > Webhooks
# URL: http://localhost:3002/sync/cms-to-medusa

# Check logs
cd sync-service
npm run dev
# Watch for errors

# Test sync manually
curl -X POST http://localhost:3002/sync/cms-to-medusa \
  -H "Content-Type: application/json" \
  -d '{"product": {...}}'
```

## 🐛 Common Errors

### Error: "Module not found"
**Solution:**
```bash
# Install missing module
npm install <module-name>

# Or reinstall all
rm -rf node_modules package-lock.json
npm install
```

### Error: "Cannot find module '@/...'
**Solution:**
```typescript
// Check tsconfig.json has paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Error: "Hydration failed"
**Solution:**
```typescript
// Check for mismatched HTML
// Common causes:
// 1. Different content on server vs client
// 2. Invalid HTML nesting
// 3. Browser extensions modifying DOM

// Fix: Use 'use client' for client-only components
'use client';
```

### Error: "CORS policy blocked"
**Solution:**
```javascript
// In backend medusa-config.js
module.exports = {
  projectConfig: {
    cors: process.env.STORE_CORS || "http://localhost:3000",
  },
}

// In CMS payload.config.ts
export default buildConfig({
  cors: ['http://localhost:3000'],
})
```

## 🔍 Debugging Tips

### Check Logs
```bash
# Frontend logs
cd frontend
npm run dev 2>&1 | tee frontend.log

# Backend logs
cd backend
npm run dev 2>&1 | tee backend.log

# CMS logs
cd cms
npm run dev 2>&1 | tee cms.log
```

### Use Browser DevTools
```
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Check Application tab for localStorage/cookies
5. Use React DevTools for component state
```

### Test APIs Directly
```bash
# Test CMS
curl http://localhost:3001/api/products

# Test Medusa
curl http://localhost:9000/store/products

# Test with authentication
curl http://localhost:9000/store/auth \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📞 Still Stuck?

### Before Asking for Help:
1. ✅ Read error message completely
2. ✅ Google the error
3. ✅ Check this troubleshooting guide
4. ✅ Check relevant documentation
5. ✅ Try suggested solutions
6. ✅ Restart services
7. ✅ Clear caches

### When Asking for Help:
Include:
- What you're trying to do
- Exact error message
- What you've already tried
- Your environment (OS, Node version)
- Relevant code snippets

### Resources:
- **Next.js**: https://nextjs.org/docs
- **Payload CMS**: https://payloadcms.com/docs
- **Medusa.js**: https://docs.medusajs.com
- **Stack Overflow**: https://stackoverflow.com
- **GitHub Issues**: Search for similar problems

## ✅ Prevention Checklist

To avoid issues:
- [ ] Use Node.js 18+
- [ ] Install all dependencies
- [ ] Set up environment variables correctly
- [ ] Start services in correct order
- [ ] Check services are running before testing
- [ ] Clear caches when things break
- [ ] Read error messages carefully
- [ ] Test one thing at a time
- [ ] Keep services updated
- [ ] Backup your work regularly

---

**Remember**: Most issues are simple fixes. Read the error, understand it, then solve it.

Good luck! 🚀
