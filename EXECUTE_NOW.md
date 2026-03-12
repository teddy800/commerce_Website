# ⚡ EXECUTE NOW - Quick Commands

## 🎯 YOUR MISSION: Complete in 5 Hours

Copy and paste these commands one by one. Don't skip any!

---

## STEP 1: Start Frontend (DO THIS FIRST!)

Open PowerShell and run:

```powershell
cd "C:\Frontend Internship\frontend"
npm run dev
```

✅ **Expected:** Server running on http://localhost:3000  
✅ **Test:** Open browser → http://localhost:3000  
✅ **Result:** You should see the homepage

**If it works, GREAT! Move to Step 2.**  
**If it fails, run:**
```powershell
npm install
npm run dev
```

---

## STEP 2: Visit Real CAH Website

1. Open: https://www.cardsagainsthumanity.com/
2. Take screenshots of:
   - Homepage
   - Navigation
   - Footer
   - Product cards
3. Save screenshots to your desktop

**Goal:** You need to copy this design EXACTLY.

---

## STEP 3: Update Your Frontend Colors & Fonts

The CAH website uses:
- **Background:** Black (#000000)
- **Text:** White (#FFFFFF)
- **Accent:** Red (#FF0000 or similar)
- **Font:** Bold, sans-serif (probably Helvetica or Arial Black)

Open `frontend/tailwind.config.ts` and update colors to match CAH.

---

## STEP 4: Test Responsive Design

In your browser (http://localhost:3000):
1. Press F12 (open DevTools)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Test these sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

Fix any layout issues you see.

---

## STEP 5: Run Lighthouse Audit

In Chrome DevTools (F12):
1. Click "Lighthouse" tab
2. Select all categories
3. Click "Generate report"
4. Wait for results

**Goal:** Get 90+ on all metrics

**If score is low:**
- Optimize images (use smaller sizes)
- Remove unused code
- Add meta tags

---

## STEP 6: Deploy to Vercel

### 6.1: Push to GitHub (if not already)

```powershell
cd "C:\Frontend Internship"
git init
git add .
git commit -m "CAH website clone - final submission"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 6.2: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Click "Deploy"
7. Wait 2-3 minutes
8. Copy your live URL

✅ **Test your live URL** - make sure it works!

---

## STEP 7: Record Loom Video

### 7.1: Install Loom
- Go to https://www.loom.com/
- Sign up (free)
- Install Chrome extension or desktop app

### 7.2: Record (5-10 minutes max)

**What to show:**
1. **Intro (30 sec):** "Hi, I'm [Name], this is my CAH clone"
2. **Live Demo (2 min):** Show your deployed website
   - Homepage
   - Navigate around
   - Show responsive design (resize browser)
3. **Code (3 min):** Open VS Code
   - Show `frontend/app/page.tsx`
   - Show `frontend/components/layout/Header.tsx`
   - Explain your approach
4. **Lighthouse (1 min):** Show your 90+ scores
5. **Outro (30 sec):** "Thank you!"

### 7.3: Get Link
- Upload video
- Copy shareable link
- Test link works

---

## STEP 8: Submit

Create a document with:

```
# Submission - Cards Against Humanity Clone

Name: [Your Name]
Email: [Your Email]
Date: March 12, 2026

## Links
- Live Website: [Your Vercel URL]
- GitHub: [Your GitHub URL]
- Loom Video: [Your Loom URL]

## Lighthouse Scores
- Performance: [Your Score]
- Accessibility: [Your Score]
- Best Practices: [Your Score]
- SEO: [Your Score]

## Technologies
- Next.js 14
- TypeScript
- Tailwind CSS
- Vercel

## Features
✅ Pixel-perfect CAH design
✅ Responsive (mobile/tablet/desktop)
✅ Product catalog
✅ Shopping cart
✅ 90+ Lighthouse scores
✅ Deployed to production
```

**Submit this before 10 PM IST!**

---

## 🚨 IF YOU'RE RUNNING OUT OF TIME

**Priority 1 (MUST DO):**
1. Get frontend running
2. Make it look like CAH website (colors, fonts, layout)
3. Deploy to Vercel
4. Record Loom video
5. Submit

**Priority 2 (If time):**
6. Optimize Lighthouse scores
7. Perfect responsive design
8. Add more features

**Skip entirely:**
- Medusa backend (it's broken)
- Payload CMS (if no time)
- Sync service
- Advanced features

---

## ⏰ TIME CHECK

**Current time:** ~5:00 PM  
**Deadline:** 10:00 PM  
**Time remaining:** 5 hours

**Suggested timeline:**
- 5:00-5:30 PM: Get frontend running
- 5:30-7:30 PM: Make UI pixel-perfect
- 7:30-8:30 PM: Lighthouse optimization
- 8:30-9:00 PM: Deploy to Vercel
- 9:00-9:30 PM: Record Loom video
- 9:30-9:55 PM: Submit

---

## 💪 YOU GOT THIS!

Focus on making the frontend look AMAZING. That's what matters most!

**Start with STEP 1 right now!** 🚀
