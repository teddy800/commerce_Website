# Database Setup Guide

Complete guide for setting up MongoDB (Payload CMS) and PostgreSQL (Medusa) databases.

## Table of Contents
1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [PostgreSQL Setup](#postgresql-setup)
3. [Database Backups](#database-backups)
4. [Database Migrations](#database-migrations)
5. [Troubleshooting](#troubleshooting)

---

## MongoDB Atlas Setup

MongoDB Atlas is used for Payload CMS to store content, products, and media.

### Step 1: Create Account

1. Visit https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google/GitHub
3. Verify your email address
4. Complete the welcome survey (optional)

### Step 2: Create Organization & Project

1. Create organization: "CAH Store" (or your preferred name)
2. Create project: "Production" or "Development"
3. You'll be redirected to the project dashboard

### Step 3: Build a Database

1. Click **"Build a Database"** button
2. Choose deployment option:
   - **M0 (Free)**: Good for development/testing
     - 512 MB storage
     - Shared RAM
     - No backup
   - **M10+ (Paid)**: Recommended for production
     - Automated backups
     - More storage and RAM
     - Better performance

3. Select cloud provider and region:
   - Provider: AWS, Google Cloud, or Azure
   - Region: Choose closest to your users
   - Recommended: AWS us-east-1 or eu-west-1

4. Cluster name: `cah-cms-cluster`
5. Click **"Create"** (takes 3-5 minutes)

### Step 4: Create Database User

1. Security Quickstart will appear
2. Choose **"Username and Password"** authentication
3. Create user:
   - Username: `cah_admin`
   - Password: Click "Autogenerate Secure Password" (save this!)
   - Or create your own strong password
4. Click **"Create User"**

### Step 5: Configure Network Access

1. Add IP addresses that can access your database
2. For development:
   - Click **"Add My Current IP Address"**
   - Or click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Warning: "Anywhere" is less secure, only for development

3. For production:
   - Add your server's specific IP address
   - Get Vercel IPs: https://vercel.com/docs/concepts/deployments/regions
   - Add each IP individually

4. Click **"Finish and Close"**

### Step 6: Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Driver: Node.js
4. Version: 4.1 or later
5. Copy the connection string:
   ```
   mongodb+srv://cah_admin:<password>@cah-cms-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. Replace `<password>` with your actual password
7. Add database name before the `?`:
   ```
   mongodb+srv://cah_admin:YOUR_PASSWORD@cah-cms-cluster.xxxxx.mongodb.net/cah_cms?retryWrites=true&w=majority
   ```

### Step 7: Update Environment Variables

```bash
# Edit cms/payload/.env
MONGODB_URI=mongodb+srv://cah_admin:YOUR_PASSWORD@cah-cms-cluster.xxxxx.mongodb.net/cah_cms?retryWrites=true&w=majority
```

### Step 8: Test Connection

```bash
cd cms/payload
npm run dev
```

If successful, you'll see:
```
[Payload] Connected to MongoDB
[Payload] Server listening on http://localhost:3001
```

### MongoDB Atlas Features

**Database Access:**
- Manage users: Database Access → Add New Database User
- Roles: Read/Write, Admin, Custom

**Network Access:**
- Manage IPs: Network Access → Add IP Address
- Temporary access: Set expiration time

**Monitoring:**
- Real-time metrics: Metrics tab
- Query performance: Performance Advisor
- Alerts: Alerts tab

**Backups (M10+ only):**
- Automated daily backups
- Point-in-time recovery
- Download backups

---

## PostgreSQL Setup

PostgreSQL is used for Medusa backend to store products, orders, and customers.

### Option A: Local PostgreSQL (Development)

#### macOS Installation

```bash
# Install via Homebrew
brew install postgresql@14

# Start PostgreSQL
brew services start postgresql@14

# Verify installation
psql --version
```

#### Ubuntu/Debian Installation

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
psql --version
```

#### Windows Installation

1. Download installer: https://www.postgresql.org/download/windows/
2. Run installer (PostgreSQL 14 recommended)
3. Set password for postgres user (save this!)
4. Port: 5432 (default)
5. Locale: Default
6. Complete installation
7. PostgreSQL will start automatically

#### Create Database

```bash
# Connect to PostgreSQL
# macOS/Linux:
psql postgres

# Windows (use pgAdmin or):
psql -U postgres

# Create database
CREATE DATABASE medusa_store;

# Create user
CREATE USER medusa_admin WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE medusa_store TO medusa_admin;

# Connect to new database
\c medusa_store

# Grant schema privileges
GRANT ALL ON SCHEMA public TO medusa_admin;

# Exit
\q
```

#### Update Environment Variables

```bash
# Edit backend/medusa/.env
DATABASE_URL=postgresql://medusa_admin:your_secure_password@localhost:5432/medusa_store
```

### Option B: Render PostgreSQL (Production)

#### Step 1: Create Render Account

1. Visit https://render.com
2. Sign up with GitHub, GitLab, or email
3. Verify email

#### Step 2: Create PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Configure database:
   - Name: `medusa-db`
   - Database: `medusa_store`
   - User: `medusa_admin`
   - Region: Choose closest to your users
   - PostgreSQL Version: 14
   - Plan: **Free** (for development) or **Starter** (for production)

3. Click **"Create Database"**
4. Wait 2-3 minutes for provisioning

#### Step 3: Get Connection Strings

Render provides two connection strings:

**Internal Database URL** (for services on Render):
```
postgresql://medusa_admin:xxxxx@dpg-xxxxx-a/medusa_store
```

**External Database URL** (for local development):
```
postgresql://medusa_admin:xxxxx@dpg-xxxxx-a.oregon-postgres.render.com/medusa_store
```

#### Step 4: Update Environment Variables

**For local development:**
```bash
# Edit backend/medusa/.env
DATABASE_URL=[paste External Database URL]
```

**For Render deployment:**
```bash
# In Render dashboard, add environment variable:
DATABASE_URL=[paste Internal Database URL]
```

#### Step 5: Configure Connection Pooling (Optional)

For better performance with free tier:

```bash
# Add to DATABASE_URL
DATABASE_URL=postgresql://user:pass@host/db?connection_limit=5
```

### Option C: Other PostgreSQL Providers

#### Supabase

1. Visit https://supabase.com
2. Create project
3. Get connection string from Settings → Database
4. Use "Connection pooling" URL for better performance

#### ElephantSQL

1. Visit https://www.elephantsql.com
2. Create instance (Free tier: 20MB)
3. Copy URL from Details page

#### Heroku Postgres

1. Create Heroku app
2. Add Heroku Postgres addon
3. Get DATABASE_URL from Config Vars

### Run Migrations

After setting up PostgreSQL:

```bash
cd backend/medusa

# Run migrations
npm run migrations

# You should see:
# Migration completed successfully
```

### Verify Database

```bash
# Connect to database
psql [your-database-url]

# List tables
\dt

# You should see Medusa tables:
# - product
# - product_variant
# - cart
# - order
# - customer
# etc.

# Exit
\q
```

---

## Database Backups

### MongoDB Atlas Backups

#### Free Tier (M0)
- No automated backups
- Manual export only

**Manual Export:**
```bash
# Install MongoDB Database Tools
# macOS:
brew install mongodb-database-tools

# Export database
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/cah_cms" --out=./backup

# Restore database
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/cah_cms" ./backup/cah_cms
```

#### Paid Tier (M10+)
- Automated daily backups
- Retention: 2-7 days (configurable)
- Point-in-time recovery
- One-click restore

**Configure Backups:**
1. Go to cluster → Backup tab
2. Enable "Continuous Backup"
3. Set retention period
4. Configure backup schedule

**Restore from Backup:**
1. Backup tab → View All Snapshots
2. Select snapshot
3. Click "Restore"
4. Choose restore method:
   - Automated restore (new cluster)
   - Download files (manual restore)

### PostgreSQL Backups

#### Local Backups

**Backup:**
```bash
# Full database backup
pg_dump -U medusa_admin -h localhost medusa_store > backup_$(date +%Y%m%d_%H%M%S).sql

# Compressed backup
pg_dump -U medusa_admin -h localhost medusa_store | gzip > backup_$(date +%Y%m%d).sql.gz

# Backup specific tables
pg_dump -U medusa_admin -h localhost -t product -t product_variant medusa_store > products_backup.sql
```

**Restore:**
```bash
# Restore from backup
psql -U medusa_admin -h localhost medusa_store < backup_20240301.sql

# Restore from compressed backup
gunzip -c backup_20240301.sql.gz | psql -U medusa_admin medusa_store
```

**Automated Backups (cron):**
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * pg_dump -U medusa_admin medusa_store | gzip > /backups/medusa_$(date +\%Y\%m\%d).sql.gz

# Keep only last 7 days
0 3 * * * find /backups -name "medusa_*.sql.gz" -mtime +7 -delete
```

#### Render Backups

**Free Tier:**
- No automated backups
- Manual backups only

**Manual Backup:**
```bash
# Get External Database URL from Render dashboard
pg_dump [external-database-url] > backup.sql
```

**Paid Tier (Starter+):**
- Automated daily backups
- Retention: 7 days (Starter), 30 days (Pro)
- One-click restore

**Restore from Render:**
1. Dashboard → Database → Backups tab
2. Select backup
3. Click "Restore"

#### Backup Best Practices

1. **Frequency:**
   - Development: Weekly
   - Production: Daily (minimum)
   - High-traffic: Multiple times per day

2. **Storage:**
   - Store backups in different location than database
   - Use cloud storage (S3, Google Cloud Storage)
   - Keep multiple versions

3. **Testing:**
   - Test restore process regularly
   - Verify backup integrity
   - Document restore procedures

4. **Automation:**
   - Use cron jobs or scheduled tasks
   - Monitor backup success/failure
   - Alert on backup failures

---

## Database Migrations

### Medusa Migrations

Medusa uses TypeORM for database migrations.

**Run Migrations:**
```bash
cd backend/medusa
npm run migrations
```

**Create New Migration:**
```bash
# Generate migration from entity changes
npm run migrations:generate -- -n MigrationName

# Create empty migration
npm run migrations:create -- -n MigrationName
```

**Revert Migration:**
```bash
npm run migrations:revert
```

**Migration Files:**
- Location: `backend/medusa/migrations/`
- Format: `[timestamp]-[name].ts`

### Payload CMS Migrations

Payload CMS doesn't require explicit migrations. Schema changes are applied automatically when you:

1. Update collection configs
2. Restart the server
3. Payload updates MongoDB collections automatically

**Manual Schema Updates:**
```javascript
// In payload.config.ts
collections: [
  {
    slug: 'products',
    fields: [
      // Add new field
      {
        name: 'newField',
        type: 'text',
      },
    ],
  },
],
```

Restart server, and Payload will add the field to existing documents (with null/undefined values).

---

## Troubleshooting

### MongoDB Issues

**Connection Timeout:**
```
Error: connect ETIMEDOUT
```
Solution:
- Check Network Access whitelist
- Verify IP address is allowed
- Check firewall settings

**Authentication Failed:**
```
Error: Authentication failed
```
Solution:
- Verify username and password
- Check connection string format
- Ensure user has correct permissions

**Database Not Found:**
```
Error: Database does not exist
```
Solution:
- Add database name to connection string
- Format: `mongodb+srv://user:pass@cluster.net/DATABASE_NAME?options`

### PostgreSQL Issues

**Connection Refused:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
Solution:
- Check if PostgreSQL is running: `pg_isready`
- Start PostgreSQL: `brew services start postgresql@14`
- Check port: `lsof -i :5432`

**Password Authentication Failed:**
```
Error: password authentication failed for user
```
Solution:
- Verify password in .env
- Check pg_hba.conf for authentication method
- Reset password: `ALTER USER medusa_admin WITH PASSWORD 'newpass';`

**Too Many Connections:**
```
Error: sorry, too many clients already
```
Solution:
- Close unused connections
- Increase max_connections in postgresql.conf
- Use connection pooling

**Permission Denied:**
```
Error: permission denied for schema public
```
Solution:
```sql
GRANT ALL ON SCHEMA public TO medusa_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO medusa_admin;
```

### Migration Issues

**Migration Failed:**
```
Error: Migration failed
```
Solution:
- Check database connection
- Verify user permissions
- Review migration file for errors
- Revert and try again

**Migration Already Run:**
```
Error: Migration has already been run
```
Solution:
- Check migrations table
- Skip if already applied
- Or revert and re-run

---

## Database Monitoring

### MongoDB Atlas Monitoring

1. **Metrics:**
   - Operations per second
   - Network traffic
   - Connections
   - Query performance

2. **Alerts:**
   - Set up alerts for:
     - High CPU usage
     - Low disk space
     - Connection spikes
     - Slow queries

3. **Performance Advisor:**
   - Suggests indexes
   - Identifies slow queries
   - Recommends optimizations

### PostgreSQL Monitoring

**Check Connections:**
```sql
SELECT count(*) FROM pg_stat_activity;
```

**Check Database Size:**
```sql
SELECT pg_size_pretty(pg_database_size('medusa_store'));
```

**Check Table Sizes:**
```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

**Check Slow Queries:**
```sql
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## Security Best Practices

1. **Strong Passwords:**
   - Minimum 16 characters
   - Mix of letters, numbers, symbols
   - Use password generator

2. **Network Access:**
   - Whitelist specific IPs only
   - Avoid "Allow from Anywhere" in production
   - Use VPN for remote access

3. **User Permissions:**
   - Create separate users for different services
   - Grant minimum required permissions
   - Avoid using admin/root users

4. **Connection Strings:**
   - Never commit to Git
   - Use environment variables
   - Rotate credentials regularly

5. **Encryption:**
   - Use SSL/TLS connections
   - Enable encryption at rest (paid tiers)
   - Encrypt backups

6. **Monitoring:**
   - Enable audit logs
   - Monitor failed login attempts
   - Set up alerts for suspicious activity

---

## Next Steps

After database setup:
1. ✅ Verify connections work
2. ✅ Run migrations
3. ✅ Set up backups
4. ✅ Configure monitoring
5. → Proceed to Phase 2: Frontend Foundation

For help, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
