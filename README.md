# XastGE Resource Center

A resource sharing platform built with Elm frontend and Express backend.

## 🏗️ Architecture

```
Browser
  ↓
Nginx (port 80/443)
  ├── / → Elm static files
  ├── /api → Express backend (REST)
  └── /graphql → Express backend (GraphQL)
```

**Production stack:**
- **Frontend:** Elm → compiled to static files → served by Nginx
- **Backend:** Node.js/Express on port 3000
- **Database:** MongoDB
- **Proxy:** Nginx handles routing and static files

## Quick Start

### Development Mode

1. **Install dependencies:**
```bash
npm install
```

2. **Update API config for local development:**
   Edit [frontend/src/Api/Config.elm](frontend/src/Api/Config.elm) and uncomment localhost URLs

3. **Start MongoDB:**
```bash
# Make sure MongoDB is running on localhost:27017
```

4. **Run backend:**
```bash
cd backend
npm install
node src/index.js
```

5. **Run frontend (in another terminal):**
```bash
cd frontend
npm install
npm run hot-serve
```

6. **Access:** http://localhost:5000

### Production Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete deployment instructions with Nginx.

Quick production deploy:
```bash
./deploy.sh all                    # Build everything
sudo ./deploy.sh deploy-frontend   # Deploy to Nginx
sudo ./deploy.sh nginx             # Setup Nginx config
./deploy.sh pm2                    # Start backend with PM2
```

## Project Structure

```
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── controller/  # Route handlers
│   │   ├── model/       # MongoDB models
│   │   ├── repository/  # Data access layer
│   │   ├── service/     # Business logic
│   │   ├── graphql/     # GraphQL schema & resolvers
│   │   └── route/       # REST API routes
│   └── package.json
├── frontend/            # Elm SPA
│   ├── src/
│   │   ├── Api/        # Backend API integration
│   │   ├── Component/  # UI components
│   │   ├── Model/      # Data models
│   │   └── Main.elm
│   └── package.json
├── nginx.conf          # Nginx configuration
├── deploy.sh           # Deployment automation script
└── DEPLOYMENT.md       # Detailed deployment guide
```

## Technologies

### Frontend
- **Elm** - Functional frontend language
- **Bootstrap 5** - CSS framework
- **elm-watch** - Hot reload development

### Backend
- **Express.js** - Web framework
- **GraphQL** - Query language (with REST endpoints)
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File uploads

### Infrastructure
- **Nginx** - Reverse proxy & static file server

## Configuration

### Backend Environment Variables

Configuration is stored in the root `.env` file (already created and gitignored).
Edit `.env` in the project root with your production values.

Key variables:
- `PORT` - Backend port (default: 3000)
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins (production)

### Frontend API Configuration

[frontend/src/Api/Config.elm](frontend/src/Api/Config.elm):
- **Production:** Uses relative URLs (`/api`, `/graphql`)
- **Development:** Use `http://localhost:3000/api`

## Available Scripts

### Root
- `npm install` - Install all dependencies

### Backend
- `node src/index.js` - Start server
- Development runs on port 3000

### Frontend
- `npm run dev` - Start elm-watch hot reload
- `npm run serve` - Serve static files (port 5000)
- `npm run hot-serve` - Run both dev + serve
- `npm run build` - Build optimized Elm
- `npm run build:prod` - Build + copy assets to dist/

## API Documentation

### REST Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/assets` - List assets
- `POST /api/assets/upload` - Upload asset
- `GET /api/assets/:id` - Get asset details
- `GET /api/assets/:id/download` - Download asset

### GraphQL Endpoint
- `POST /graphql` - GraphQL queries/mutations
- GraphiQL interface available in development mode

## License

See [LICENSE](LICENSE) file for details.