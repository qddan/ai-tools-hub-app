#!/bin/bash

# Deployment script for AI Tools Hub
echo "🚀 Starting deployment..."

# Build the app
echo "📦 Building the application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo "🌐 Ready to deploy!"
echo ""
echo "To deploy with Windsurf App Deploys:"
echo "1. Push your code to GitHub"
echo "2. Go to Windsurf App Deploys"
echo "3. Connect your repository"
echo "4. Set environment variables:"
echo "   - DATABASE_URL (PostgreSQL connection string)"
echo "   - NEXTAUTH_SECRET (random string)"
echo "   - NEXTAUTH_URL (your deployed URL)"
echo ""
echo "Note: For production, you'll need to migrate from SQLite to PostgreSQL"
