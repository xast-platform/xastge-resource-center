#!/bin/bash
set -e

echo "🚀 Deploying XASTGE Resource Center Backend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_DIR="backend"
NGINX_CONF="/etc/nginx/sites-available/xastge-resource-center"
NGINX_ENABLED="/etc/nginx/sites-enabled/xastge-resource-center"

# Check if running as root for nginx operations
check_permissions() {
    if [ "$EUID" -ne 0 ] && [ "$1" == "nginx" ]; then 
        echo -e "${RED}❌ Please run with sudo for Nginx setup${NC}"
        exit 1
    fi
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
            setup_backend
            echo ""
            echo -e "${GREEN}✅ Backend setup complete!${NC}"
            echo ""
            echo -e "${YELLOW}Next steps:${NC}"
            echo "1. Setup Nginx: sudo ./deploy.sh nginx"
            echo "2. Start backend: ./deploy.sh pm2"
            echo ""
            echo -e "${YELLOW}Frontend (Cloudflare Pages):${NC}"
            echo "1. Push to Git"
            echo "2. Connect repository to Cloudflare Pages"
            echo "3. Build command: cd frontend && npm install && npm run build"
            echo "4. Output directory: frontend/dist"
            ;;
        *)
            echo "Usage: ./deploy.sh {nginx|backend|pm2|all}"
            echo ""
            echo "Commands:"
            echo "  nginx    - Setup Nginx configuration (requires sudo)"
            echo "  backend  - Install backend dependencies"
            echo "  pm2      - Start backend with PM2"
            echo "  all      - Setup backend and show next steps (default)"
            exit 1
            ;;
    esac
}

main "$@"
