# 🎯 Payload CMS Setup Guide

## ⚠️ IMPORTANT WARNING

**Time Required:** 30-45 minutes  
**Your Deadline:** Tonight at 10 PM IST  
**Current Time:** ~5:30 PM IST  
**Time Remaining:** ~4.5 hours

**Setting up Payload CMS will consume valuable time you need for:**
- Making your UI look like CAH website (most important!)
- Deploying to Vercel
- Recording Loom video
- Submitting before deadline

## 🚀 RECOMMENDED: Skip Payload CMS

Your frontend is already working with mock data! The errors are gone. You can:
1. Focus on making the UI pixel-perfect
2. Deploy immediately
3. Submit on time

## 📋 If You Still Want to Set Up Payload CMS

### Step 1: Create MongoDB Atlas Account (15 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or Email (free)
3. Create a new project: "CAH-Project"
4. Click "Build a Database"
5. Choose "FREE" tier (M0 Sandbox)
6. Select a cloud provider and region (closest to you)
7. Click "Create"
8. Wait 3-5 minutes for cluster to be created

### Step 2: Get MongoDB Connection String (5 minutes)

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/payload-cms?retryWrites=true&w=majority`

### Step 3: Update .env File (2 minutes)

Open `cms/payload/.env` and update:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/payload-cms?retryWrites=true&w=majority
PAYLOAD_SECRET=change-this-to-a-random-string-abc123xyz789
PAYLOAD_PORT=3001
MEDUSA_URL=http://localhost:9000
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
```

### Step 4: Install Dependencies (if not done)

```powershell
cd cms/payload
npm install
```

This may take 5-10 minutes.

### Step 5: Start Payload CMS

```powershell
npm run dev
```

### Step 6: Create Admin Account

1. Open http://localhost:3001/admin
2. Fill in the registration form:
   - Email: admin@test.com
   - Password: admin123
   - Confirm Password: admin123
3. Click "Create First User"

### Step 7: Add Content

1. Go to "Products" → "Create New"
2. Add product details:
   - Title: "Cards Against Humanity"
   - Slug: "cards-against-humanity"
   - Description: "The main game"
   - Price: 25.00
   - Upload an image
3. Click "Save"
4. Repeat for more products

### Step 8: Update Frontend to Use Real CMS

Open `frontend/lib/api/payload.ts` and change:

```typescript
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false // Use real CMS
```

---

## ⏰ TIME CHECK

If it's already past 6:00 PM IST, **STOP** and skip Payload CMS!

You need time for:
- UI styling (2 hours)
- Deployment (30 minutes)
- Loom video (30 minutes)
- Submission prep (30 minutes)

---

## 🎯 WHAT MATTERS MOST FOR YOUR SUBMISSION

1. **Pixel-perfect UI** matching CAH website (40% of grade)
2. **Deployed and working** on Vercel (30% of grade)
3. **Loom video** showing your work (20% of grade)
4. **Lighthouse scores** 90+ (10% of grade)

Payload CMS is nice-to-have, not must-have!

---

## ✅ YOUR FRONTEND IS ALREADY WORKING

I've already fixed your frontend to use mock data with CAH-themed content:
- Homepage with hero section
- Product catalog
- Product details
- No more errors!

**Open http://localhost:3000 right now and see!**

---

## 💡 MY STRONG RECOMMENDATION

1. **Skip Payload CMS** for now
2. **Focus on UI styling** - make it look exactly like https://www.cardsagainsthumanity.com/
3. **Deploy to Vercel** - get it live
4. **Record Loom video** - show your work
5. **Submit before 10 PM** - don't miss the deadline!

You can always add Payload CMS later if you have extra time.

**What do you want to do?**
- Option A: Skip CMS, focus on UI and deployment (RECOMMENDED)
- Option B: Continue with CMS setup (RISKY - may not finish in time)
