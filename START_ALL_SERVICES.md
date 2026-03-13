# 🚀 Start All Services

## Quick Commands (Run in Separate Terminals)

### Terminal 1 - Frontend
```powershell
cd frontend
npm run dev
```
**URL**: http://localhost:3000

### Terminal 2 - Payload CMS
```powershell
cd cms/payload
npm run dev
```
**URL**: http://localhost:3001/admin

### Terminal 3 - Sync Service
```powershell
cd sync-service
npm run dev
```
**URL**: http://localhost:4000/health

### Terminal 4 - Medusa Backend
```powershell
cd backend/medusa
npm run dev
```
**URLs**: 
- API: http://localhost:9000
- Admin: http://localhost:7001

---

## Login Credentials

### Medusa Admin
- **URL**: http://localhost:7001/login
- **Email**: `test@admin.com`
- **Password**: `admin123`

### Payload CMS
- **URL**: http://localhost:3001/admin
- **Create account on first visit**

---

## Check All Services

```powershell
# Frontend
curl http://localhost:3000

# Payload CMS
curl http://localhost:3001/api/globals

# Sync Service
curl http://localhost:4000/health

# Medusa API
curl http://localhost:9000/health

# Medusa Admin
curl http://localhost:7001
```

---

## Stop All Services

Press `Ctrl + C` in each terminal window.

---

## All Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Next.js e-commerce site |
| Payload CMS | http://localhost:3001/admin | Content management |
| Sync Service | http://localhost:4000/health | Data synchronization |
| Medusa API | http://localhost:9000 | E-commerce backend API |
| Medusa Admin | http://localhost:7001 | Medusa admin panel |

---

**All services are ready! 🎉**
