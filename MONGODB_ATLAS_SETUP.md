# 🗄️ MongoDB Atlas Setup - Step by Step Guide

## ⏰ Time Required: 15 minutes

Follow these steps EXACTLY as written.

---

## Step 1: Go to MongoDB Atlas Website

1. Open your browser
2. Go to: **https://www.mongodb.com/cloud/atlas/register**
3. You should see the MongoDB Atlas sign-up page

---

## Step 2: Sign Up for Free Account

**Option A: Sign up with Google (FASTEST - Recommended)**
1. Click the "Sign up with Google" button
2. Choose your Google account
3. Allow MongoDB to access your account
4. You'll be automatically logged in

**Option B: Sign up with Email**
1. Enter your email address
2. Enter your first name and last name
3. Create a password (at least 8 characters)
4. Check the box "I agree to the Terms of Service and Privacy Policy"
5. Click "Create your Atlas account"
6. Check your email for verification link
7. Click the verification link
8. You'll be redirected to MongoDB Atlas

---

## Step 3: Complete the Welcome Survey (Optional - Can Skip)

MongoDB will ask you some questions:
- What is your goal today? → Select "Learn MongoDB"
- What type of application are you building? → Select "E-commerce"
- What is your preferred language? → Select "JavaScript"

**OR just click "Skip" at the bottom to save time**

---

## Step 4: Create a New Project

1. You'll see "Create a project" or "New Project" button
2. Click it
3. Enter project name: **CAH-Project** (or any name you like)
4. Click "Next"
5. You'll see "Add Members" page - **Skip this** by clicking "Create Project"

---

## Step 5: Build a Database

1. You'll see "Build a Database" button - Click it
2. You'll see three options:
   - **Serverless** (Pay as you go)
   - **Dedicated** (Starts at $57/month)
   - **Shared** (FREE)

3. **Choose "Shared" (FREE tier)**
4. Click the "Create" button under "Shared"

---

## Step 6: Configure Your Cluster

### 6.1: Choose Cloud Provider & Region

1. **Provider**: Choose any (AWS, Google Cloud, or Azure - doesn't matter)
2. **Region**: Choose the one closest to you
   - If you're in India: Choose "Mumbai (ap-south-1)"
   - If you're in US: Choose "N. Virginia (us-east-1)"
   - If you're in Europe: Choose "Ireland (eu-west-1)"
3. **Cluster Tier**: Should show "M0 Sandbox" (FREE) - Don't change this!
4. **Cluster Name**: Leave as "Cluster0" or change to "CAH-Cluster"

### 6.2: Additional Settings (Leave as default)

- MongoDB Version: Leave as default (latest)
- Backup: Not available on free tier

### 6.3: Click "Create" Button

The button is at the bottom right. Click it!

---

## Step 7: Wait for Cluster Creation (3-5 minutes)

You'll see a screen that says:
- "Creating your cluster..."
- "This may take a few minutes"

**DO NOT CLOSE THIS PAGE!**

While waiting, you'll see a progress indicator. The cluster is being provisioned.

---

## Step 8: Security Quickstart - Create Database User

Once the cluster is created, you'll see a "Security Quickstart" popup:

### 8.1: Create Database User

1. **Authentication Method**: Choose "Username and Password"
2. **Username**: Enter `admin` (or any username you like)
3. **Password**: Click "Autogenerate Secure Password" button
   - **IMPORTANT**: Copy this password and save it somewhere safe!
   - Or create your own password (at least 8 characters)
4. Click "Create User"

**SAVE YOUR USERNAME AND PASSWORD - YOU'LL NEED THEM!**

Example:
- Username: `admin`
- Password: `Abc123xyz789` (your generated password)

---

## Step 9: Security Quickstart - Add IP Address

You'll see "Where would you like to connect from?"

1. **Choose**: "My Local Environment"
2. **IP Address**: Click "Add My Current IP Address" button
   - This will automatically detect and add your IP
3. **OR** for easier access (development only):
   - Click "Add IP Address"
   - Enter: `0.0.0.0/0` (allows access from anywhere)
   - Description: "Allow all IPs"
   - Click "Add Entry"
4. Click "Finish and Close"

---

## Step 10: Get Your Connection String

1. Click "Connect" button on your cluster
2. You'll see "Connect to Cluster0" popup
3. Choose "Connect your application"
4. **Driver**: Select "Node.js"
5. **Version**: Select latest version (4.1 or later)
6. You'll see a connection string like:

```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **Click the "Copy" button** to copy this string

---

## Step 11: Prepare Your Connection String

You need to modify the connection string:

**Original:**
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Modified (replace `<password>` with your actual password):**
```
mongodb+srv://admin:Abc123xyz789@cluster0.xxxxx.mongodb.net/payload-cms?retryWrites=true&w=majority
```

**Changes made:**
1. Replace `<password>` with your actual password (the one you saved earlier)
2. Add `/payload-cms` before the `?` to specify the database name

**Example:**
If your password is `MyPass123`, your connection string becomes:
```
mongodb+srv://admin:MyPass123@cluster0.abc123.mongodb.net/payload-cms?retryWrites=true&w=majority
```

---

## Step 12: Update Your .env File

1. Open the file: `cms/payload/.env`
2. Find the line that starts with `MONGODB_URI=`
3. Replace it with your connection string:

```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/payload-cms?retryWrites=true&w=majority
```

4. Also update the PAYLOAD_SECRET:

```env
PAYLOAD_SECRET=my-super-secret-key-change-this-123
```

5. Save the file

---

## ✅ Verification Checklist

Before proceeding, make sure you have:

- [ ] MongoDB Atlas account created
- [ ] Cluster created and showing "Active" status
- [ ] Database user created (username and password saved)
- [ ] IP address whitelisted (0.0.0.0/0 or your current IP)
- [ ] Connection string copied
- [ ] Connection string modified (password replaced, database name added)
- [ ] `.env` file updated with connection string

---

## 🎯 What's Next?

Once you've completed all steps above, tell me:

**"MongoDB Atlas is ready"**

Then I'll help you:
1. Start Payload CMS
2. Create your admin account
3. Add content

---

## 🚨 Common Issues

### Issue: "Can't find the Connect button"
**Solution**: Make sure your cluster status shows "Active" (green). Wait a few more minutes if it's still creating.

### Issue: "Authentication failed"
**Solution**: Double-check your password in the connection string. Make sure there are no extra spaces.

### Issue: "IP not whitelisted"
**Solution**: Go to "Network Access" in the left sidebar, click "Add IP Address", enter `0.0.0.0/0`

### Issue: "Connection string doesn't work"
**Solution**: Make sure you:
1. Replaced `<password>` with your actual password
2. Added `/payload-cms` before the `?`
3. No extra spaces in the connection string

---

## ⏰ Time Check

If this is taking more than 20 minutes, **STOP** and use mock data instead!

You need time for UI styling and deployment!
