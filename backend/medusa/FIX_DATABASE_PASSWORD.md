# Fix PostgreSQL Password Authentication

## ✅ Fixed: Missing @medusajs/event-bus-local
The package has been installed successfully.

## ❌ Current Issue: Password Authentication Failed

The error `password authentication failed for user "postgres"` means the password in your `.env` file doesn't match your PostgreSQL password.

## Solution Options:

### Option 1: Find Your PostgreSQL Password (Recommended)

Your PostgreSQL password was set during installation. Common defaults:
- `postgres` (most common)
- `admin`
- `root`
- Or a custom password you set during installation

### Option 2: Reset PostgreSQL Password

Run these commands in PowerShell **as Administrator**:

```powershell
# Connect to PostgreSQL (it will prompt for current password)
psql -U postgres

# Once connected, run this SQL command to change password:
ALTER USER postgres WITH PASSWORD 'newpassword123';

# Exit
\q
```

### Option 3: Use Windows Authentication (No Password)

If you installed PostgreSQL with Windows authentication, update your `.env`:

```env
DATABASE_URL=postgresql://postgres@localhost:5432/medusa_db
```

(Notice: no password in the URL)

## Steps to Fix:

### Step 1: Test Your PostgreSQL Connection

Try connecting with different passwords:

```powershell
# Test with password 'postgres'
psql -U postgres -d postgres

# If that doesn't work, try without password
psql -U postgres -d postgres -W
```

### Step 2: Update .env File

Once you know the correct password, update `backend/medusa/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/medusa_db
```

Replace `YOUR_ACTUAL_PASSWORD` with your actual PostgreSQL password.

### Step 3: Create Database

```powershell
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE medusa_db;

# Verify it was created
\l

# Exit
\q
```

### Step 4: Run Migrations

```powershell
cd C:\Frontend Internship\backend\medusa
npx medusa migrations run
```

### Step 5: Create Admin User

```powershell
npx medusa user -e admin@test.com -p admin123
```

### Step 6: Start Server

```powershell
npm run dev
```

## Quick Fix Commands (Copy-Paste)

If your PostgreSQL password is `postgres`:

```powershell
# 1. Create database
psql -U postgres -c "CREATE DATABASE medusa_db;"

# 2. Run migrations
npx medusa migrations run

# 3. Create admin user
npx medusa user -e admin@test.com -p admin123

# 4. Start server
npm run dev
```

## Still Having Issues?

### Check PostgreSQL Service Status

```powershell
# Check if PostgreSQL is running
Get-Service -Name postgresql*
```

If not running:

```powershell
# Start PostgreSQL service
Start-Service -Name "postgresql-x64-12"  # Adjust version number
```

### Find PostgreSQL Installation

```powershell
# Find where PostgreSQL is installed
Get-Command psql
```

### Check pg_hba.conf Authentication Method

The file is usually at: `C:\Program Files\PostgreSQL\12\data\pg_hba.conf`

Look for this line:
```
host    all             all             127.0.0.1/32            md5
```

If it says `trust` instead of `md5`, you don't need a password.

## Common PostgreSQL Passwords by Installation Method:

- **PostgreSQL Installer**: Password you set during installation
- **Docker**: Usually `postgres`
- **Homebrew (Mac)**: No password (use `trust` authentication)
- **apt-get (Linux)**: Usually `postgres`
- **Windows Installer**: Custom password set during installation

## Need to Reset Everything?

If you want to start fresh:

```powershell
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS medusa_db;"
psql -U postgres -c "CREATE DATABASE medusa_db;"

# Run migrations
npx medusa migrations run

# Create admin user
npx medusa user -e admin@test.com -p admin123
```

## Next Steps After Fixing:

1. ✅ Database connection works
2. ✅ Migrations completed
3. ✅ Admin user created
4. ✅ Server starts on http://localhost:9000
5. ✅ Admin panel accessible at http://localhost:7000

Then you can proceed with:
- Setting up Payload CMS
- Configuring the sync service
- Testing the full stack
