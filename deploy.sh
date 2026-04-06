#!/bin/bash
set -e

echo "🚀 Deploying XASTGE Resource Center with Nginx architecture..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"
NGINX_WEB_ROOT="/var/www/html"
NGINX_CONF="/etc/nginx/sites-available/xastge-resource-center"
NGINX_ENABLED="/etc/nginx/sites-enabled/xastge-resource-center"

# Check if running as root for nginx operations
check_permissions() {
    if [ "$EUID" -ne 0 ] && [ "$1" == "nginx" ]; then 
        echo -e "${RED}❌ Please run with sudo for Nginx setup${NC}"
        exit 1
    fi
}

# Build frontend
build_frontend() {
    echo -e "${YELLOW}📦 Building frontend...${NC}"
    cd $FRONTEND_DIR
    npm install
    npm run build:prod
    cd ..
    echo -e "${GREEN}✅ Frontend built successfully${NC}"
}

# Deploy frontend to nginx
deploy_frontend() {
    check_permissions nginx
    echo -e "${YELLOW}📤 Deploying frontend to $NGINX_WEB_ROOT...${NC}"
    
    # Create web root if it doesn't exist
    sudo mkdir -p $NGINX_WEB_ROOT
    
    # Copy built files
    sudo cp -r $FRONTEND_DIR/dist/* $NGINX_WEB_ROOT/
    
    # Set permissions
    sudo chown -R www-data:www-data $NGINX_WEB_ROOT
    sudo chmod -R 755 $NGINX_WEB_ROOT
    
    echo -e "${GREEN}✅ Frontend deployed${NC}"
}

# Setup nginx configuration
setup_nginx() {
    check_permissions nginx
    echo -e "${YELLOW}⚙️  Setting up Nginx configuration...${NC}"
    
    # Copy nginx config
    sudo cp nginx.conf $NGINX_CONF
    
    # Enable site
    sudo ln -sf $NGINX_CONF $NGINX_ENABLED
    
    # Test nginx configuration
    sudo nginx -t
    
    # Reload nginx
    sudo systemctl reload nginx
    
    echo -e "${GREEN}✅ Nginx configured and reloaded${NC}"
}

# Setup backend
setup_backend() {
    echo -e "${YELLOW}🔧 Setting up backend...${NC}"
    cd $BACKEND_DIR
    npm install
    cd ..
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
}

# Start backend with PM2 (optional)
start_backend_pm2() {
    echo -e "${YELLOW}🚀 Starting backend with PM2...${NC}"
    
    if ! command -v pm2 &> /dev/null; then
        echo -e "${RED}❌ PM2 not found. Install with: npm install -g pm2${NC}"
        return 1
    fi
    
    cd $BACKEND_DIR
    pm2 start src/index.js --name xastge-backend
    pm2 save
    cd ..
    
    echo -e "${GREEN}✅ Backend started with PM2${NC}"
}

# Main deployment flow
main() {
    case "${1:-all}" in
        frontend)
            build_frontend
            ;;
        deploy-frontend)
            build_frontend
            deploy_frontend
            ;;
        nginx)
            setup_nginx
            ;;
        backend)
            setup_backend
            ;;
        pm2)
            start_backend_pm2
            ;;
        all)
            build_frontend
            setup_backend
            echo ""
            echo -e "${GREEN}✅ Build complete!${NC}"
            echo ""
            echo -e "${YELLOW}Next steps:${NC}"
            echo "1. Setup Nginx: sudo ./deploy.sh deploy-frontend"
            echo "2. Setup Nginx config: sudo ./deploy.sh nginx"
            echo "3. Start backend: cd backend && node src/index.js"
            echo "   OR with PM2: ./deploy.sh pm2"
            ;;
        *)
            echo "Usage: ./deploy.sh {frontend|deploy-frontend|nginx|backend|pm2|all}"
            echo ""
            echo "Commands:"
            echo "  frontend         - Build frontend only"
            echo "  deploy-frontend  - Build and deploy frontend to Nginx (requires sudo)"
            echo "  nginx            - Setup Nginx configuration (requires sudo)"
            echo "  backend          - Install backend dependencies"
            echo "  pm2              - Start backend with PM2"
            echo "  all              - Build everything and show next steps (default)"
            exit 1
            ;;
    esac
}

main "$@"
