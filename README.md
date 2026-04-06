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
# Push to Git
git add .
git commit -m "Deploy to Cloudflare Pages"
git push

# In Cloudflare Dashboard:
# - Connect your Git repo
# - Build command: cd frontend && npm install && npm run build
# - Output directory: frontend/dist
# - Auto-deploys on every push!
```

### 2️⃣ Backend → VPS
```bash
# On your VPS
git clone your-repo
cd xastge-resource-center

# Update .env
nano .env
# Set: NODE_ENV=production
# Set: ALLOWED_ORIGINS=https://your-project.pages.dev
# Set: PUBLIC_BACKEND_URL=https://api.yourdomain.com

# Deploy
./deploy.sh all           # Setup backend
sudo ./deploy.sh nginx    # Configure Nginx (update server_name first!)
./deploy.sh pm2          # Start with PM2

# Setup SSL (recommended)
sudo certbot --nginx -d api.yourdomain.com
```

### 3️⃣ Update Frontend API Config
Edit `frontend/src/Api/Config.elm`:
```elm
backendUrl = "https://api.yourdomain.com/api"
graphqlUrl = "https://api.yourdomain.com/graphql"
```

Then push to trigger Cloudflare Pages rebuild.