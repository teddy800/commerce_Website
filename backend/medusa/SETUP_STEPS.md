# Medusa Backend Setup Steps

## Issues Fixed:
1. ✅ Removed Redis dependency from config (commented out redis_url)
2. ✅ Using `medusa-payment-manual` for test payments (already installed)
3. ✅ Updated .env with proper database credentials

## Prerequisites:
- PostgreSQL must be running on localhost:5432
- Database `medusa_db` must exist
- PostgreSQL user: `postgres` with password: `postgres`

## Setup Commands:

### 1. Create Database (if not exists)
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE medusa_db;

# Exit
\q
```

### 2. Install Dependencies (if needed)
```bash
npm install
```

### 3. Run Migrations
```bash
npx medusa migrations run
```

### 4. Create Admin User
```bash
npx medusa user -e admin@test.com -p admin123
```

### 5. Start Development Server
```bash
npm run dev
```

The server will start on http://localhost:9000

### 6. Test API
```bash
curl http://localhost:9000/store/products
```

## Common Issues:

### Issue: "Unable to find plugin medusa-payment-stripe"
**Solution**: Already fixed - using `medusa-payment-manual` instead

### Issue: Redis connection error
**Solution**: Already fixed - Redis is now optional and commented out

### Issue: Database connection failed
**Solution**: 
- Make sure PostgreSQL is running
- Update DATABASE_URL in .env with your actual password
- Create the database: `CREATE DATABASE medusa_db;`

### Issue: Wrong password
**Solution**: Update the password in .env file:
```
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/medusa_db
```

## Next Steps After Setup:
1. Access Medusa Admin at http://localhost:7000
2. Create products in the admin panel
3. Test the API endpoints
4. Configure the sync service to connect CMS and Medusa
