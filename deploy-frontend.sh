#!/bin/bash
set -e

echo "🚀 Building and deploying frontend to 'deploy' branch..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Build frontend
echo -e "${YELLOW}📦 Building frontend...${NC}"
cd frontend
npm install
npm run build
cd ..

# Check if dist exists
if [ ! -d "frontend/dist" ]; then
    echo "Error: frontend/dist not found"
    exit 1
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Create/checkout deploy branch
echo -e "${YELLOW}🔀 Switching to deploy branch...${NC}"
git checkout -B deploy

# Remove everything except frontend/dist and .git
echo -e "${YELLOW}🧹 Cleaning deploy branch...${NC}"
find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.git' ! -name 'frontend' -exec rm -rf {} +
find frontend -maxdepth 1 ! -name 'frontend' ! -name 'dist' -exec rm -rf {} +

# Move dist contents to root
mv frontend/dist/* .
rm -rf frontend

# Commit and push
echo -e "${YELLOW}📤 Committing and pushing...${NC}"
git add -A
git commit -m "Deploy frontend $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push -f origin deploy

# Return to original branch
echo -e "${YELLOW}↩️  Returning to ${CURRENT_BRANCH}...${NC}"
git checkout $CURRENT_BRANCH

echo -e "${GREEN}✅ Frontend deployed to 'deploy' branch!${NC}"
echo ""
echo "Cloudflare Pages settings:"
echo "  Branch: deploy"
echo "  Build command: (empty)"
echo "  Output directory: /"
