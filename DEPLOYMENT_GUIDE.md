# 🚀 Deployment Guide - AI Tools Hub

## 📋 Deployment Checklist

✅ Code pushed to GitHub  
✅ Build successful  
✅ Environment variables template ready  
✅ Documentation complete  

## 🌐 Deploy with Windsurf App Deploys

### Step 1: Go to Windsurf App Deploys
1. Open Windsurf IDE
2. Navigate to **App Deploys** section
3. Click **"Deploy New App"**

### Step 2: Connect Repository
1. Choose **"GitHub"** as source
2. Select your repository: `qddan/ai-tools-hub-app`
3. Click **"Connect"**

### Step 3: Configure Build Settings
```yaml
Build Command: npm run build
Start Command: npm start
Node Version: 18.x
```

### Step 4: Set Environment Variables
In Windsurf App Deploys, add these environment variables:

```bash
# Database (PostgreSQL required for production)
DATABASE_URL=postgresql://username:password@host:port/database

# Next.js Configuration
NEXTAUTH_SECRET=your-random-secret-string-here
NEXTAUTH_URL=https://your-app-domain.vercel.app

# Optional: For custom domain
NEXTAUTH_URL=https://your-custom-domain.com
```

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at the provided URL

## 🗄 Database Setup (Production)

### Option 1: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the **Connection string**
5. Use as `DATABASE_URL`

### Option 2: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Use as `DATABASE_URL`

### Option 3: Railway
1. Go to [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Get connection URL
4. Use as `DATABASE_URL`

## 🔄 Database Migration

After deployment, you need to set up the production database:

1. **Access your deployed app's terminal** (via Windsurf App Deploys)
2. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```
3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

## ✅ Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Tools listing page works
- [ ] Search and filtering functions
- [ ] Tool detail pages display
- [ ] Category and industry pages work
- [ ] Database connection is active
- [ ] All images load (Clearbit logos)
- [ ] SEO metadata is present
- [ ] Mobile responsive design works

## 🔧 Troubleshooting

### Build Errors
- Check Node.js version (18+)
- Verify all dependencies installed
- Check environment variables syntax

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database is running
- Ensure network allows connection

### Runtime Errors
- Check deployment logs in Windsurf
- Verify environment variables
- Test database connectivity

## 🌍 Custom Domain (Optional)

1. In Windsurf App Deploys, go to **"Domains"**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

## 📊 Monitoring

- Check Windsurf App Deploys dashboard for:
  - Build status
  - Runtime errors
  - Performance metrics
  - Usage statistics

## 🔄 Updates

To update your deployed app:
1. Make changes locally
2. Test with `npm run build && npm start`
3. Commit and push to GitHub
4. Windsurf will auto-deploy

## 🆘 Support

If you encounter issues:

1. **Check Windsurf App Deploys logs** - Most errors appear here
2. **Verify environment variables** - Common source of issues
3. **Test database connection** - Ensure PostgreSQL is accessible
4. **Check build locally** - Run `npm run build` to verify

## 🎉 Success!

Once deployed, your AI Tools Hub will be live with:
- 94+ real AI tools
- Full search and filtering
- SEO optimization
- Responsive design
- Daily data updates via ISR

Your app URL will be provided by Windsurf App Deploys after successful deployment.
