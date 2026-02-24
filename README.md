# AI Tools Hub

A searchable directory for AI tools and MCP servers — inspired by [reactnative.directory](https://reactnative.directory). Built with Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, and Prisma.

![Homepage](public/screenshots/homepage.png)

## Features

- **94 AI Tools + 98 MCP Servers** — comprehensive, searchable directory
- **Directory-style UI** — data-dense list view with ratings, views, clicks
- **Dark Mode** — system-aware theme toggle via next-themes
- **MCP Servers Directory** — search, filter by category & difficulty
- **Advanced Search & Filtering** — URL-driven, shareable filter states
- **Category & Industry Pages** — organized browsing across 25 categories, 12 industries
- **SEO Optimized** — dynamic metadata, sitemap, structured data
- **Responsive** — mobile-first, works on all screen sizes
- **E2E Tested** — 31 Playwright tests covering all routes

## Screenshots

| Light Mode                                         | Dark Mode                                              |
| -------------------------------------------------- | ------------------------------------------------------ |
| ![Homepage Light](public/screenshots/homepage.png) | ![Homepage Dark](public/screenshots/homepage-dark.png) |

| MCP Servers Directory                              | Tool Detail Page                                   |
| -------------------------------------------------- | -------------------------------------------------- |
| ![MCP Servers](public/screenshots/mcp-servers.png) | ![Tool Detail](public/screenshots/tool-detail.png) |

| Tools Directory                        | Categories                                       |
| -------------------------------------- | ------------------------------------------------ |
| ![Tools](public/screenshots/tools.png) | ![Categories](public/screenshots/categories.png) |

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui (Radix UI)
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Icons**: Lucide React
- **Dark Mode**: next-themes
- **Testing**: Playwright (31 E2E tests)
- **Deployment**: Vercel

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

## Pages Overview

### Homepage (`/`)

Unified search across AI tools and MCP servers, stats dashboard, featured tools list, trending + MCP side-by-side, category grid.

### AI Tools Directory (`/tools`)

Directory-style list view with ratings, views, clicks. Search, category filters, sort options (Popular, Top Rated, Latest, A-Z). Pagination.

### MCP Servers Directory (`/mcp`)

98 MCP servers across 17 categories. Search, category & difficulty filter toggles. GitHub stars, popularity rank.

### Tool/MCP Detail Pages (`/tools/[slug]`, `/mcp/[slug]`)

Comprehensive info: features, use cases, pros/cons, setup guides, similar tools. Dynamic SEO metadata.

### Categories & Industries (`/categories`, `/industries`)

Organized browsing with tool counts per category/industry.

## Testing

```bash
npx playwright test          # Run all 31 E2E tests
npx playwright test --ui     # Interactive test runner
```

## License

MIT
