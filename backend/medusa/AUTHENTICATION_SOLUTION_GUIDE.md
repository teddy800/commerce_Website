# Medusa Authentication Solution Guide

## Quick Start - Run This ONE Command

```powershell
cd backend/medusa
.\COMPLETE_SOLUTION.ps1
```

This interactive script will:
1. Check your Medusa version
2. Give you 3 options to fix authentication
3. Guide you through the process

---

## Option 1: Setup Wizard (Recommended)

This tries to trigger Medusa's built-in setup wizard.

### Steps:
1. Run: `.\trigger-setup-wizard.ps1`
2. Follow the prompts to clear browser cache
3. When Medusa starts, go to `http://localhost:7001`
4. Look for "Create your account" or "Setup" page
5. If you see it, create your admin account there

### If you see a LOGIN page instead:
- The setup wizard is not available in your Medusa version
- Try Option 2 instead

---

## Option 2: CLI User Creation (Most Reliable)

This uses Medusa's official CLI command.

### Steps:
```powershell
# Stop everything
Get-Process node | Stop-Process -Force

# Go to medusa directory
cd backend/medusa

# Create admin user
npx medusa user -e admin@medusa.com -p admin123

# Start Medusa
npm run dev
```

### Login:
- URL: `http://localhost:7001`
- Email: `admin@medusa.com`
- Password: `admin123`

---

## Option 3: API User Creation

This creates a user while Medusa is running.

### Steps:
1. Start Medusa in one terminal:
   ```powershell
   cd backend/medusa
   npm run dev
   ```

2. In another terminal, run:
   ```powershell
   cd backend/medusa
   node create-admin-via-medusa-api.js
   ```

3. Login at `http://localhost:7001`

---

## Troubleshooting

### "These credentials do not match our records"

This means one of:
1. **User doesn't exist** - Run the investigation script:
   ```powershell
   node investigate-auth.js
   ```
   This will show if users exist in the database.

2. **Wrong password hash** - The user was created incorrectly.
   Solution: Delete and recreate using Option 2.

3. **Browser cache** - Clear your browser cache completely.

### "Port already in use"

```powershell
# Kill all Node processes
Get-Process node | Stop-Process -Force

# Or kill specific ports
Get-NetTCPConnection -LocalPort 7001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Get-NetTCPConnection -LocalPort 9000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### Check what's in the database

```powershell
node investigate-auth.js
```

This shows:
- All users in the database
- Password hash validity
- Database schema
- Recommendations

---

## Why Direct Database Insertion Doesn't Work

Medusa uses its own authentication system that:
- May use scrypt instead of bcrypt
- Requires specific user ID formats
- Needs proper metadata
- Has internal validation

**Always use Medusa's tools:**
- ✅ `npx medusa user` (CLI)
- ✅ `userService.create()` (API)
- ❌ Direct SQL INSERT (doesn't work)

---

## Final Notes

If none of these work, there might be a deeper issue with:
1. Database migrations not run properly
2. Medusa configuration errors
3. Database connection issues

Run this to check:
```powershell
npm run migrations
```

Then try Option 2 again.
