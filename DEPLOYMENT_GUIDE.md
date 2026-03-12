# Deployment Guide

Complete guide for deploying the Cards Against Humanity E-commerce Platform to production.

## Overview

This platform consists of 4 services that need to be deployed:

1. **Frontend (Next.js)** → Vercel
2. **CMS (Payload)** → Vercel
3. **Backend (Medusa)** → Render
4. **Sync Service** → Render

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Render account (free tier works)
- MongoDB Atlas account (free tier works)
- Domain name (optional)

## Step 1: Database Setup

### MongoDB Atlas (for Payload CMS)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/cah-cms
   ```

### PostgreSQL (for Medusa)

Render provides free PostgreSQL:

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Name: `medusa-db`
4. Select free tier
5. Create database
6. Copy the "Internal Database URL"

## Step 2: Deploy Medusa Backend to Render

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Service**
   - Name: `cah-medusa-backend`
   - Root Directory: `backend/medusa`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   DATABASE_URL=<your-postgres-internal-url>
   REDIS_URL=<render-redis-url>
   JWT_SECRET=<generate-random-string>
   COOKIE_SECRET=<generate-random-string>
   STORE_CORS=https://your-frontend.vercel.app
   ADMIN_CORS=https://your-frontend.vercel.app
   SYNC_SERVICE_URL=https://your-sync-service.onrender.com
   MEDUSA_WEBHOOK_SECRET=<generate-random-string>
   MEDUSA_API_KEY=<generate-random-string>
   ```

4. **Create Redis Instance** (optional, for production)
   - Click "New +" → "Redis"
   - Name: `medusa-redis`
   - Select free tier
   - Copy the "Internal Redis URL"

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the URL: `https://cah-medusa-backend.onrender.com`

6. **Run Migrations**
   - Go to Shell tab in Render
   - Run: `npm run migrate`

## Step 3: Deploy Sync Service to Render

1. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `cah-sync-service`
   - Root Directory: `sync-service`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   PORT=3002
   MEDUSA_API_URL=https://cah-medusa-backend.onrender.com
   PAYLOAD_API_URL=https://cah-cms.vercel.app
   MEDUSA_API_KEY=<same-as-medusa>
   PAYLOAD_WEBHOOK_SECRET=<generate-random-string>
   MEDUSA_WEBHOOK_SECRET=<same-as-medusa>
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Note the URL: `https://cah-sync-service.onrender.com`

## Step 4: Deploy Payload CMS to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Payload CMS"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Other
     - Root Directory: `cms/payload`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Environment Variables**
   ```
   MONGODB_URI=<your-mongodb-atlas-url>
   PAYLOAD_SECRET=<generate-random-string-min-32-chars>
   PAYLOAD_PUBLIC_SERVER_URL=https://cah-cms.vercel.app
   FRONTEND_URL=https://cah-frontend.vercel.app
   SYNC_SERVICE_URL=https://cah-sync-service.onrender.com
   PAYLOAD_WEBHOOK_SECRET=<same-as-sync-service>
   REVALIDATE_SECRET=<generate-random-string>
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Note the URL: `https://cah-cms.vercel.app`

## Step 5: Deploy Frontend to Vercel

1. **Import to Vercel**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `.next`

2. **Environment Variables**
   ```
   NEXT_PUBLIC_MEDUSA_API_URL=https://cah-medusa-backend.onrender.com
   NEXT_PUBLIC_PAYLOAD_API_URL=https://cah-cms.vercel.app
   REVALIDATE_SECRET=<same-as-cms>
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Note the URL: `https://cah-frontend.vercel.app`

## Step 6: Update Environment Variables

Now that all services are deployed, update the URLs:

### Update Medusa Backend
```
STORE_CORS=https://cah-frontend.vercel.app
ADMIN_CORS=https://cah-frontend.vercel.app
SYNC_SERVICE_URL=https://cah-sync-service.onrender.com
```

### Update Sync Service
```
MEDUSA_API_URL=https://cah-medusa-backend.onrender.com
PAYLOAD_API_URL=https://cah-cms.vercel.app
```

### Update Payload CMS
```
PAYLOAD_PUBLIC_SERVER_URL=https://cah-cms.vercel.app
FRONTEND_URL=https://cah-frontend.vercel.app
SYNC_SERVICE_URL=https://cah-sync-service.onrender.com
```

### Update Frontend
```
NEXT_PUBLIC_MEDUSA_API_URL=https://cah-medusa-backend.onrender.com
NEXT_PUBLIC_PAYLOAD_API_URL=https://cah-cms.vercel.app
```

## Step 7: Seed Initial Data

1. **Access Payload CMS Admin**
   - Go to `https://cah-cms.vercel.app/admin`
   - Create admin account
   - Create initial products

2. **Access Medusa Admin**
   - Go to `https://cah-medusa-backend.onrender.com/app`
   - Create admin account
   - Verify products synced from CMS

## Step 8: Test the Platform

1. **Test Frontend**
   - Visit `https://cah-frontend.vercel.app`
   - Browse products
   - Add to cart
   - Complete checkout (test mode)

2. **Test CMS**
   - Update a product in Payload CMS
   - Verify it syncs to Medusa
   - Verify frontend updates (may take up to 5 minutes due to ISR)

3. **Test Sync**
   - Update inventory in Medusa
   - Verify it syncs to CMS

## Step 9: Custom Domain (Optional)

### Frontend Domain
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain (e.g., `shop.yourdomain.com`)
4. Follow DNS configuration instructions

### CMS Domain
1. Add domain in Vercel (e.g., `cms.yourdomain.com`)
2. Update `PAYLOAD_PUBLIC_SERVER_URL` in CMS
3. Update `NEXT_PUBLIC_PAYLOAD_API_URL` in Frontend

### Backend Domain
1. Add custom domain in Render
2. Update `NEXT_PUBLIC_MEDUSA_API_URL` in Frontend

## Step 10: Performance Optimization

### Enable Vercel Analytics
1. Go to Vercel project settings
2. Enable "Analytics"
3. Enable "Speed Insights"

### Configure Caching
- ISR is already configured (5 min for homepage, 10 min for products)
- Adjust in `frontend/app/page.tsx` and `frontend/app/products/[slug]/page.tsx`

### Image Optimization
- Next.js automatically optimizes images
- Ensure images in CMS are reasonable size (<2MB)

## Troubleshooting

### Medusa won't start
- Check DATABASE_URL is correct
- Run migrations: `npm run migrate`
- Check logs in Render dashboard

### CMS won't connect to MongoDB
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check MONGODB_URI format
- Verify database user has read/write permissions

### Sync not working
- Check webhook secrets match
- Verify SYNC_SERVICE_URL is correct in both CMS and Medusa
- Check sync service logs in Render

### Frontend not loading data
- Verify API URLs are correct
- Check CORS settings in Medusa
- Check browser console for errors

## Monitoring

### Vercel
- View deployment logs
- Monitor analytics
- Check function logs

### Render
- View service logs
- Monitor resource usage
- Set up alerts

## Backup Strategy

### MongoDB Atlas
- Automatic backups enabled on free tier
- Manual backup: Export collections

### PostgreSQL on Render
- Automatic backups on paid plans
- Manual backup: Use pg_dump

## Security Checklist

- [ ] All secrets are random and secure
- [ ] CORS is properly configured
- [ ] Webhook secrets are set
- [ ] Database users have minimal permissions
- [ ] Environment variables are not committed to Git
- [ ] HTTPS is enabled on all services
- [ ] Rate limiting is configured (production)

## Cost Estimate

### Free Tier (Development)
- Vercel: Free (2 projects)
- Render: Free (750 hours/month)
- MongoDB Atlas: Free (512MB)
- **Total: $0/month**

### Production (Recommended)
- Vercel Pro: $20/month
- Render Standard: $7/month (backend) + $7/month (sync)
- MongoDB Atlas M10: $57/month
- **Total: ~$91/month**

## Next Steps

1. Set up monitoring and alerts
2. Configure custom domain
3. Add more products
4. Test thoroughly
5. Launch! 🚀

## Support

For issues:
1. Check logs in Vercel/Render dashboards
2. Review TROUBLESHOOTING.md
3. Check GitHub issues
4. Contact support

---

**Congratulations!** Your e-commerce platform is now live! 🎉
