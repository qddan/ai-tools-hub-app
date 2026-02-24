# AI Tools Hub

A comprehensive directory for discovering, comparing, and choosing AI tools. Built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

## 🚀 Features

- **94+ Real AI Tools** - Curated database of actual AI tools across 25 categories
- **Advanced Search & Filtering** - Search by name, category, pricing, and more
- **Tool Details** - Comprehensive information including features, pricing, pros/cons
- **Category & Industry Pages** - Organized browsing experience
- **SEO Optimized** - Dynamic metadata, sitemap, and structured data
- **Responsive Design** - Works seamlessly on all devices
- **Daily Data Freshness** - ISR with 24-hour revalidation

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Deployment**: Windsurf App Deploys

## 📋 Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ai-tools-hub-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Set up the database**

   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🗄 Database Setup

The app uses Prisma with SQLite for development and PostgreSQL for production.

### Development (SQLite)

```bash
npm run db:push    # Create SQLite database
npm run db:seed    # Seed with 94+ AI tools
npm run db:studio  # View database in Prisma Studio
```

### Production (PostgreSQL)

1. Set up a PostgreSQL database (recommended: Supabase, Neon, or Railway)
2. Set `DATABASE_URL` in your environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Seed the database: `npm run db:seed`

## 🚀 Deployment with Windsurf App Deploys

### 1. Prepare for Deployment

```bash
# Build and test locally
npm run build
npm start

# Or use the deployment script
./deploy.sh
```

### 2. Deploy Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Set up Windsurf App Deploys**
   - Go to Windsurf App Deploys
   - Connect your GitHub repository
   - Configure build settings:
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
     - **Node Version**: `18.x` or higher

3. **Set Environment Variables**

   ```
   DATABASE_URL=postgresql://user:pass@host:port/dbname
   NEXTAUTH_SECRET=your-random-secret-string
   NEXTAUTH_URL=https://your-domain.com
   ```

4. **Deploy!**
   - Windsurf will automatically build and deploy your app
   - Your site will be live at the provided URL

### 3. Post-Deployment

- Verify all pages load correctly
- Test search and filtering functionality
- Check database connectivity
- Monitor deployment logs for any issues

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (pages)/        # Main pages
│   ├── tools/          # Tool listing and detail pages
│   ├── categories/     # Category pages
│   ├── industries/     # Industry pages
│   └── api/           # API routes
├── components/         # React components
│   ├── ui/           # shadcn/ui components
│   ├── tools/        # Tool-related components
│   └── layout/       # Layout components
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── generated/        # Prisma client (gitignored)
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with tools
- `npm run db:studio` - Open Prisma Studio

## 🌟 Features Overview

### Homepage

- Hero section with call-to-action
- Real-time statistics (tools count, categories, ratings)
- Featured tools showcase
- Trending tools section
- Category grid with tool counts

### Tools Directory

- Advanced search functionality
- Filter by category, pricing, and sort options
- Pagination for large datasets
- Responsive grid layout
- Tool cards with key information

### Tool Details

- Comprehensive tool information
- Features, pricing plans, and use cases
- Pros and cons analysis
- Related categories and tags
- Visit website CTA

### SEO Features

- Dynamic metadata for all pages
- XML sitemap generation
- Robots.txt configuration
- Open Graph tags
- Structured data (JSON-LD)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues during deployment:

1. Check the deployment logs in Windsurf
2. Verify environment variables are set correctly
3. Ensure database connection is working
4. Check that the build completes successfully

For additional help, create an issue in the repository.
