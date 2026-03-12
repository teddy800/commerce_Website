# 🚀 START HERE - Medusa Setup

## ✅ All packages installed! Only need PostgreSQL password.

---

## 📝 QUICK FIX (3 Steps):

### 1️⃣ Edit `.env` file

Open `backend/medusa/.env` and change:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/medusa_db
```

**Common passwords to try:**
- `postgres`
- `admin`  
- `root`

**Example:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa_db
```

### 2️⃣ Create database

```powershell
psql -U postgres -c "CREATE DATABASE medusa_db;"
```

### 3️⃣ Run setup

```powershell
npx medusa migrations run
npx medusa user -e admin@test.com -p admin123
npm run dev
```

---

## ✅ Success looks like:

```
Server listening on port 9000
Admin: http://localhost:7000
```

---

## ❓ Don't know your PostgreSQL password?

Try connecting:
```powershell
psql -U postgres -l
```

If it asks for password, try: `postgres`, `admin`, or `root`

---

## 📚 More Help:

- **Detailed guide:** `FINAL_SETUP_STEPS.md`
- **Password help:** `FIX_DATABASE_PASSWORD.md`
- **Automated setup:** Run `.\setup-medusa.ps1`

---

**That's it! Just update the password and run the 3 commands above.** 🎉
