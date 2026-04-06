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

### 1️⃣ Frontend → Cloudflare Pages (via deploy branch)
```bash
# Build and push to deploy branch
./deploy-frontend.sh

# In Cloudflare Dashboard (first time only):
# Workers & Pages → Create → Connect to Git
# - Branch: deploy
# - Build command: (leave empty)
# - Output directory: /
# - Auto-deploys when you run ./deploy-frontend.sh
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

Then deploy: `./deploy-frontend.sh`

## 🔧 Development

### Local Development
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

The `deploy-frontend.sh` script:
1. Builds frontend (`npm run build` in frontend/)
2. Switches to `deploy` git branch
3. Copies built files (index.html, elm.js, assets/) to root
4. Commits and force-pushes to `origin/deploy`
5. Returns to your original branch

Cloudflare Pages watches the `deploy` branch and auto-deploys changes.