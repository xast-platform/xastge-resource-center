# XastGE Resource Center

A game assets sharing platform built with Elm frontend and Express backend.

## 🏗️ Architecture

```
Browser
  ↓
Cloudflare Pages (Frontend - Global CDN)
  ↓
VPS Nginx (Backend API - port 80/443)
  ├── /api → Express backend (port 3000)
  └── /graphql → Express backend (port 3000)
```

**Production stack:**
- **Frontend:** Elm → Cloudflare Pages (global CDN)
- **Backend:** Node.js/Express → VPS with Nginx reverse proxy
- **Database:** MongoDB
- **Storage:** Cloudflare R2

## Quick Deploy

### 1️⃣ Frontend → Cloudflare Pages
```bash
./deploy-frontend.sh

# In Cloudflare Dashboard (first time):
# - Branch: deploy
# - Build command: (empty)
# - Output directory: /
# - Custom domain: rc.xast.org
```

### 2️⃣ Backend → VPS
```bash
# On VPS
git clone your-repo
cd xastge-resource-center

# Update .env
nano .env
# Set: NODE_ENV=production
# Set: ALLOWED_ORIGINS=https://rc.xast.org

# Deploy
./deploy.sh backend
sudo ./deploy.sh nginx
./deploy.sh pm2

# Setup SSL
sudo certbot --nginx -d api.rc.xast.org
```

### 3️⃣ Done!
**Frontend:** https://rc.xast.org  
**Backend API:** https://api.rc.xast.org

## 🔧 Development
```bash
# Backend
cd backend
node src/index.js
# Runs on http://localhost:3000

# Frontend (in another terminal)
cd frontend
# Uncomment localhost URLs in src/Api/Config.elm first
npm run hot-serve
# Runs on http://localhost:5000
```

### Frontend Deployment Process

**Frontend (`deploy-frontend.sh`):**
1. Builds frontend locally
2. Pushes to `deploy` branch
3. Cloudflare Pages auto-deploys

**Backend:** Nginx proxies API requests to Express on port 3000