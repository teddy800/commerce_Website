# ✅ Complete Medusa Setup Fix Guide

## Issues Fixed:
1. ✅ **Missing @medusajs/event-bus-local** - INSTALLED
2. ✅ **Redis warnings** - FIXED (using fake Redis for development)
3. ⚠️ **PostgreSQL password** - NEEDS YOUR INPUT

## Current Status:
- ✅ All required packages installed
- ✅ Configuration files updated
- ⚠️ Database password needs to be set

---

## 🚀 Quick Fix (3 Steps)

### Step 1: Find Your PostgreSQL Password

**Option A: Use the automated tester**
```powershell
cd C:\Frontend Internship\backend\medusa
.\test-postgres-connection.ps1
```

**Option B: Test manually**
```powershell
# Try connecting (it will prompt for password)
psql -U postgres -d postgres
```

**Option C: Common passwords to try**
- `postgres`
- `admin`
- `root`
- The password you set during installation

### Step 2: Update .env File

Open `backend/medusa/.env` and replace `YOUR_PASSWORD`:

```env
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/medusa_db
```

For example, if your password is `postgres`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa_db
```

### Step 3: Run Setup Commands

```powershell
# Create database
psql -U postgres -c "CREATE DATABASE medusa_db;"

# Run migrations
npx medusa migrations run

# Create admin user
npx medusa user -e admin@test.com -p admin123

# Start server
npm run dev
```

---

## 📋 Detailed Instructions

### If You Don't Know Your PostgreSQL Password:

#### Method 1: Reset Password (Recommended)

1. Open PowerShell **as Administrator**
2. Connect to PostgreSQL:
   ```powershell
   psql -U postgres
   ```
3. If it asks for password and you don't know it, try these:
   - Press Enter (no password)
   - Type: `postgres`
   - Type: `admin`

4. Once connected, reset the password:
   ```sql
   ALTER USER postgres WITH PASSWORD 'newpassword123';
   \q
   ```

5. Update your `.env` file with the new password

#### Method 2: Check PostgreSQL Configuration

1. Find your PostgreSQL installation folder (usually `C:\Program Files\PostgreSQL\12\`)
2. Open `data\pg_hba.conf`
3. Look for this line:
   ```
   host    all             all             127.0.0.1/32            md5
   ```
4. If it says `trust` instead of `md5`, you don't need a password:
   ```env
   DATABASE_URL=postgresql://postgres@localhost:5432/medusa_db
   ```

### If PostgreSQL is Not Running:

```powershell
# Check status
Get-Service -Name postgresql*

# Start service (adjust version number)
Start-Service -Name "postgresql-x64-12"
```

---

## 🎯 After Successful Setup

You should see:
```
✅ Database connection successful
✅ Migrations completed (50+ migrations)
✅ Admin user created
✅ Server running on http://localhost:9000
```

Test the API:
```powershell
curl http://localhost:9000/store/products
```

Access Admin Panel:
```
http://localhost:7000
Login: admin@test.com
Password: admin123
```

---

## 🔧 Troubleshooting

### Error: "database medusa_db does not exist"
```powershell
psql -U postgres -c "CREATE DATABASE medusa_db;"
```

### Error: "role postgres does not exist"
```powershell
# Create postgres user
psql -U postgres -c "CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';"
```

### Error: "psql: command not found"
Add PostgreSQL to PATH:
1. Find PostgreSQL bin folder: `C:\Program Files\PostgreSQL\12\bin`
2. Add to System Environment Variables PATH
3. Restart PowerShell

### Error: "port 5432 is already in use"
Another PostgreSQL instance is running. Find and stop it:
```powershell
Get-Process -Name postgres
Stop-Process -Name postgres -Force
```

---

## 📝 Summary of Changes Made

1. **Installed missing package:**
   ```
   @medusajs/event-bus-local
   ```

2. **Updated medusa-config.js:**
   - Commented out `redis_url` in projectConfig
   - Using fake Redis for development
   - Using `medusa-payment-manual` for test payments

3. **Created helper files:**
   - `COMPLETE_FIX_GUIDE.md` (this file)
   - `FIX_DATABASE_PASSWORD.md` (detailed password guide)
   - `test-postgres-connection.ps1` (automated password tester)
   - `SETUP_STEPS.md` (step-by-step setup)

---

## 🎬 Next Steps After Medusa is Running

1. ✅ Medusa backend running
2. ⏭️ Set up Payload CMS
3. ⏭️ Set up Sync Service
4. ⏭️ Configure Frontend to connect to Medusa
5. ⏭️ Test full stack integration

---

## 💡 Pro Tips

- **Save your password**: Write down your PostgreSQL password for future reference
- **Use environment variables**: Never commit `.env` files to Git
- **Test connection first**: Always test database connection before running migrations
- **Check logs**: If something fails, check the error message carefully

---

## 🆘 Still Need Help?

If you're still stuck, provide:
1. The exact error message
2. Your PostgreSQL version: `psql --version`
3. Your Windows version
4. Whether you can connect to PostgreSQL at all: `psql -U postgres`

Common solutions:
- Reinstall PostgreSQL with a known password
- Use Docker for PostgreSQL (easier setup)
- Use a cloud PostgreSQL instance (Render, Supabase, etc.)
