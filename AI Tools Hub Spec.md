# AI TOOLS HUB - Complete Development Specification for Claude Opus 4.6

**Project Name**: AI Tools Hub  
**Domain**: aitools-hub.com (hoặc aitools.vn cho thị trường Việt Nam)  
**Tagline**: "Discover, Compare & Choose the Perfect AI Tool"  
**Vietnamese**: "Khám phá và So sánh 200+ Công cụ AI Hàng Đầu"

---

## 🎯 PROJECT OVERVIEW

### Vision

Xây dựng directory web app đầu tiên của riêng bạn - một nền tảng tổng hợp và phân loại 200+ AI tools, giúp người dùng dễ dàng tìm kiếm, so sánh và lựa chọn công cụ AI phù hợp với nhu cầu của họ.

### Target Users

- Developers cần tools để code, test, deploy
- Marketers tìm tools cho content, SEO, social media
- Business owners cần automation, analytics, CRM
- Designers cần tools cho graphics, video, UI/UX
- Students & Educators cần tools cho learning, research

### Core Value Proposition

1. **Comprehensive**: 200+ tools across 20+ categories
2. **Curated**: Quality over quantity - verified tools only
3. **Comparable**: Side-by-side comparison features
4. **Categorized**: By function (LLM, Design) AND industry (Healthcare, Finance)
5. **Community-driven**: User reviews, ratings, real use cases

### Why This Project?

- **Your first web project**: Foundation cho portfolio web development
- **Learning opportunity**: Master Next.js App Router, Prisma, TypeScript, Tailwind
- **Potential revenue**: $50K-80K/year through affiliates, sponsored listings
- **Portfolio piece**: Impressive project để show trong CV/portfolio
- **Future app version**: Sau khi web xong, build React Native app (your expertise!)

---

## 🏗️ TECHNICAL ARCHITECTURE

### Tech Stack (Non-negotiable)

**Frontend**

- Framework: Next.js 15 (App Router, React Server Components)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS 3.4+
- UI Components: shadcn/ui (Radix UI primitives)
- Icons: Lucide React

**Backend**

- Runtime: Node.js (Next.js API Routes + Server Actions)
- Database: PostgreSQL 15+
- ORM: Prisma 5.22+
- Authentication: NextAuth.js 4.24+

**Data Fetching & State**

- Server: React Server Components (default)
- Client: TanStack Query (React Query) v5
- Forms: React Hook Form + Zod validation
- State: Zustand (minimal client state)

**Deployment**

- Hosting: Vercel (Next.js optimized)
- Database: Supabase (PostgreSQL free tier → Pro $25/month)
- CDN: Cloudflare (optional, for images)
- Domain: Namecheap hoặc Cloudflare

**Development Tools**

- Package Manager: npm
- Code Quality: ESLint + Prettier
- Git: GitHub
- IDE: Windsurf with Claude Opus 4.6

### Project Structure

ai-tools-hub/
├── prisma/
│ ├── schema.prisma # Database schema (provided)
│ ├── seed.ts # Seed script (to be created)
│ └── seed-data/
│ ├── part1.json # 21 premium tools (provided)
│ ├── part2.json # 29 additional tools (provided)
│ └── part3.json # 135 enterprise tools (provided)
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── (home)/  
│ │ │ └── page.tsx # Homepage
│ │ ├── tools/
│ │ │ ├── page.tsx # Tools listing
│ │ │ └── [slug]/
│ │ │ └── page.tsx # Tool detail
│ │ ├── category/
│ │ │ └── [slug]/
│ │ │ └── page.tsx # Category page
│ │ ├── industry/
│ │ │ └── [slug]/
│ │ │ └── page.tsx # Industry page
│ │ ├── compare/
│ │ │ └── page.tsx # Tool comparison
│ │ ├── api/
│ │ │ └── [...routes] # API endpoints
│ │ ├── layout.tsx # Root layout
│ │ └── globals.css # Global styles
│ ├── components/
│ │ ├── ui/ # shadcn/ui components
│ │ ├── layout/ # Header, Footer, Sidebar
│ │ ├── tools/ # ToolCard, ToolGrid, ToolDetail
│ │ ├── filters/ # FilterSidebar, SearchBar
│ │ └── common/ # Reusable components
│ ├── lib/
│ │ ├── prisma.ts # Prisma client singleton
│ │ ├── utils.ts # Utility functions
│ │ ├── constants.ts # Constants & config
│ │ └── validations.ts # Zod schemas
│ └── types/
│ └── index.ts # TypeScript types
├── public/
│ ├── images/ # Static images
│ └── logos/ # Tool logos
├── docs/
│ ├── PRODUCT_VISION.md # Product vision (to be created)
│ ├── TECH_STACK.md # Tech decisions (to be created)
│ ├── CONTENT_STRATEGY.md # SEO & content (provided)
│ └── PROJECT_ROADMAP.md # Timeline (provided)
├── .env.example # Environment template (provided)
├── .env.local # Local environment (create yourself)
├── package.json # Dependencies (provided)
├── tsconfig.json # TypeScript config (provided)
├── tailwind.config.ts # Tailwind config (provided)
├── next.config.js # Next.js config (provided)
├── schema.prisma # Prisma schema (provided)
└── README.md # Documentation (provided)

---

## 📊 DATABASE SCHEMA OVERVIEW

### Core Models (from schema.prisma)

**Tool** (Main entity)

- id, name, slug, developer, description
- logoUrl, thumbnailUrl, website
- categories (M2M), industries (M2M), tags (M2M)
- pricingPlans (1-N), features (1-N), useCases (1-N)
- rating, reviewCount, views, clicks, bookmarks
- isFeatured, isSponsored, isActive

**Category** (Function-based: LLM, Design, Video...)

- id, name, slug, description, icon, color

**Industry** (Domain-based: Healthcare, Finance...)

- id, name, slug, description, icon

**Tag** (Flexible tagging)

- id, name, slug

**PricingPlan**

- toolId, name, price, currency, period, features[]

**User**

- id, email, name, avatarUrl
- reviews, bookmarks

**Review**

- toolId, userId, rating, title, content
- helpfulCount, isVerified

**Analytics** (ToolView, ToolClick)

- Track views and clicks for popularity metrics

### Seed Data Summary

- **185 AI tools** total across 3 JSON files
- **Part 1** (21 tools): ChatGPT, Claude, Gemini, Cursor, Midjourney, Sora, ElevenLabs...
- **Part 2** (29 tools): Zapier, Canva, Gamma, Fireflies, Surfer SEO...
- **Part 3** (135 tools): Healthcare AI, Finance AI, E-commerce, Legal, HR, Education...
- Each tool has: name, developer, description, categories, industries, pricing, features, website, rating

---

## 🎨 DESIGN SYSTEM & UI REQUIREMENTS

### Design Principles

1. **Clean & Modern**: Minimalist, plenty of white space
2. **Mobile-first**: Responsive from 320px to 4K
3. **Fast**: <2s page load, optimized images, code splitting
4. **Accessible**: WCAG 2.1 AA compliance
5. **Consistent**: Reusable components, design tokens

### Color Scheme (Tailwind)

Primary: Blue (#3B82F6) - Trust, technology
Secondary: Slate (#64748B) - Professional
Accent: Emerald (#10B981) - Success, growth
Warning: Amber (#F59E0B) - Attention
Danger: Red (#EF4444) - Errors, critical
Background: White (#FFFFFF) / Dark (#0F172A)
Text: Slate-900 (#0F172A) / White (#FFFFFF)

### Typography

- Font: Inter (primary), JetBrains Mono (code)
- Headings: 600-700 weight
- Body: 400-500 weight
- Line height: 1.5 (body), 1.2 (headings)

### Components to Build (using shadcn/ui)

- Button (variants: default, outline, ghost, link)
- Card (for tool cards)
- Badge (for tags, pricing)
- Input, Textarea, Select
- Dialog, Sheet (for modals, drawers)
- Dropdown Menu
- Tabs
- Accordion
- Checkbox, Radio Group
- Toast (notifications)
- Skeleton (loading states)

### Layout Components

- Header: Logo, navigation, search, user menu
- Footer: Links, social, newsletter signup
- Sidebar: Filters (categories, industries, pricing)
- Container: Max-width responsive wrapper
- Grid: Tool cards grid (responsive columns)

---

## 🚀 MVP FEATURES (Phase 1 - Week 1-4)

### Must-Have Features

**1. Homepage**

- Hero section with search bar
- Quick stats (185 tools, 20 categories, 12 industries)
- Featured categories grid (6-8 cards)
- Trending tools carousel (based on views/clicks)
- Recent additions (latest 6 tools)
- Newsletter signup form
- SEO optimized (meta tags, structured data)

**2. Tools Listing (/tools)**

- Grid of tool cards (responsive: 1-4 columns)
- Each card shows: logo, name, tagline, rating, pricing badge, category tags
- Sidebar filters:
  - Categories (checkboxes, multi-select)
  - Industries (checkboxes, multi-select)
  - Pricing (Free, Freemium, Paid, Enterprise)
  - Rating (5 stars, 4+, 3+)
  - Platforms (Web, Desktop, Mobile, API)
- Search bar (full-text search by name, description, features)
- Sort options: Popular, Latest, Top Rated, A-Z
- Pagination (20 tools per page) or infinite scroll
- URL query params for filters (shareable links)

**3. Tool Detail Page (/tools/[slug])**

- Hero: Logo, name, developer, rating, website link (affiliate)
- Quick info: Categories, industries, platforms
- Description (long-form, rich text)
- Key Features (bullet list with icons)
- Pricing Plans (comparison table)
  - Free tier (if available)
  - Paid plans with prices
  - "Get Started" CTA buttons (affiliate links)
- Screenshots/Demo (image gallery or embed)
- Use Cases (3-5 real-world examples)
- Pros & Cons (2 columns)
- User Reviews (list with ratings)
- Similar Tools (4-6 recommendations)
- FAQs (accordion)
- Schema markup (Product, Review aggregate)

**4. Category Pages (/category/[slug])**

- Category header (name, description, icon)
- Number of tools in category
- Filtered tool grid (same as /tools but pre-filtered)
- Related categories (links)

**5. Industry Pages (/industry/[slug])**

- Industry header (name, description, icon)
- "Top tools for {industry}" section
- Use case examples specific to industry
- Filtered tool grid
- Related industries

**6. Search (/tools with ?search=query)**

- Integrated with tools listing
- Search by: name, description, features, tags
- Highlight search terms in results
- Autocomplete suggestions (optional MVP)

**7. Footer**

- Links: About, Contact, Privacy, Terms, Submit Tool
- Social media icons
- Copyright notice

### Nice-to-Have (can defer to Phase 2)

- User authentication (NextAuth)
- User reviews & ratings
- Bookmark/save tools
- Tool comparison (side-by-side)
- Blog/content section
- Admin dashboard

---

## 🔧 IMPLEMENTATION PLAN FOR CLAUDE OPUS 4.6

### Instructions for AI Agent

You are building a production-ready Next.js web application called "AI Tools Hub" - a directory of 200+ AI tools. This is a complete MVP that must be fully functional, deployable, and ready for real users.

**Core Constraints:**

1. Use ONLY the tech stack specified (Next.js 15 App Router, Prisma, PostgreSQL, TypeScript, Tailwind, shadcn/ui)
2. Follow the database schema in `prisma/schema.prisma` exactly - DO NOT modify the schema
3. Use the seed data in `prisma/seed-data/` (3 JSON files with 185 tools)
4. All code must be production-ready: type-safe, error handling, loading states, responsive design
5. Follow Next.js 15 best practices: Server Components by default, Client Components only when needed

**Your Workflow:**

### PHASE 1: Setup & Foundation (Iteration 1-2)

**Iteration 1: Project Setup**

Create these files:

1. `docs/PRODUCT_VISION.md` - Brief overview of project goals
2. `docs/TECH_STACK.md` - Tech decisions and why
3. `docs/AGENT_INSTRUCTIONS.md` - This document (for reference)
4. Verify all provided files are in place:
   - schema.prisma
   - package.json, tsconfig.json, tailwind.config.ts, next.config.js
   - .env.example
   - 3 seed data JSON files

Tasks:

- Initialize Next.js 15 project structure
- Install dependencies from package.json
- Configure TypeScript, Tailwind, Prisma
- Setup shadcn/ui (init command)
- Create folder structure in src/

**Iteration 2: Database Setup**

Create:

1. `prisma/seed.ts` - Seed script that:
   - Reads 3 JSON files from seed-data/
   - Creates categories, industries, tags from tools data
   - Creates tools with all relationships
   - Creates sample pricing plans, features, use cases
   - Handles duplicates gracefully

2. `src/lib/prisma.ts` - Prisma client singleton

3. `.env.local` template with:
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="..."
   NEXTAUTH_URL="http://localhost:3000"

Tasks:

- Run `npx prisma generate`
- Run `npx prisma db push`
- Run `npm run db:seed` (should insert 185 tools)
- Verify in Prisma Studio: `npx prisma studio`

### PHASE 2: Core Pages (Iteration 3-6)

**Iteration 3: Layout & Shared Components**

Create:

1. `src/app/layout.tsx` - Root layout with:
   - HTML metadata
   - Global styles import
   - Font configuration (Inter)
   - Header and Footer components

2. `src/components/layout/Header.tsx` - Navigation:
   - Logo (AI Tools Hub)
   - Nav links: Browse, Categories, Industries, About
   - Search bar (desktop)
   - Mobile menu button
   - Theme toggle (optional)

3. `src/components/layout/Footer.tsx` - Footer:
   - Links grid (Products, Resources, Company, Legal)
   - Newsletter signup form
   - Social icons
   - Copyright

4. `src/components/ui/` - Install shadcn/ui components:
   - button, card, badge, input, select, dialog, skeleton, tabs, accordion

**Iteration 4: Homepage**

Create `src/app/(home)/page.tsx`:

Sections:

1. Hero:
   - H1: "Discover 200+ AI Tools That Actually Work"
   - Subheading with value prop
   - Large search bar with category dropdown
   - CTA: "Browse All Tools"

2. Stats:
   - 3 stat cards: "185+ Tools", "20 Categories", "12 Industries"
   - Fetch real counts from database

3. Featured Categories:
   - Grid of 6-8 category cards
   - Each card: icon, name, tool count, "Explore" link
   - Use actual categories from DB

4. Trending Tools:
   - Horizontal scroll or grid
   - 6-8 tool cards (sort by views DESC)
   - Each card: logo, name, rating, pricing badge

5. Recent Additions:
   - Grid of 6 newest tools (sort by createdAt DESC)

Create components:

- `src/components/tools/ToolCard.tsx` - Reusable tool card
- `src/components/common/StatsCard.tsx` - For stats section
- `src/components/common/CategoryCard.tsx` - For categories

**Iteration 5: Tools Listing Page**

Create `src/app/tools/page.tsx`:

Features:

1. Searchable & filterable tool list
2. URL query params: ?category=llm&industry=healthcare&pricing=free&search=chat
3. Sidebar with filters (desktop) or drawer (mobile)
4. Tool cards grid (responsive)
5. Pagination or infinite scroll
6. Loading states (Skeleton components)

Create components:

- `src/components/filters/FilterSidebar.tsx` - All filters
- `src/components/filters/SearchBar.tsx` - Search input with autocomplete
- `src/components/tools/ToolGrid.tsx` - Grid wrapper
- `src/components/tools/ToolCardSkeleton.tsx` - Loading skeleton

Data fetching:

- Use Prisma to query tools with filters
- Include related data: categories, industries, pricing
- Implement full-text search (PostgreSQL)
- Optimize query performance (indexes)

**Iteration 6: Tool Detail Page**

Create `src/app/tools/[slug]/page.tsx`:

Sections:

1. Hero:
   - Logo, name, developer
   - Rating stars + review count
   - Category/industry badges
   - "Visit Website" CTA (affiliate link)
   - Platforms (Web, Mobile, Desktop, API)

2. Description:
   - Rich text with formatting
   - Expandable if too long

3. Key Features:
   - Bullet list with checkmark icons
   - Grouped by feature type

4. Pricing Plans:
   - Comparison table (Free, Pro, Enterprise)
   - Features comparison
   - "Get Started" buttons (affiliate links)

5. Use Cases:
   - 3-5 real-world examples
   - Each with icon, title, description

6. Pros & Cons:
   - Two columns side-by-side
   - 3-5 items each

7. Similar Tools:
   - 4 tool cards (same category, different tools)

8. Reviews (if available):
   - Review list with ratings
   - "Write a Review" button (auth required)

SEO:

- Dynamic metadata (title, description, OG tags)
- JSON-LD structured data (Product schema)
- Breadcrumbs

Create components:

- `src/components/tools/ToolHero.tsx`
- `src/components/tools/PricingTable.tsx`
- `src/components/tools/FeatureList.tsx`
- `src/components/tools/UseCaseCard.tsx`
- `src/components/tools/SimilarTools.tsx`

### PHASE 3: Category & Industry Pages (Iteration 7-8)

**Iteration 7: Category Pages**

Create `src/app/category/[slug]/page.tsx`:

- Fetch category by slug
- Display category header (name, description, icon)
- Show tool count
- Render filtered ToolGrid (pre-filtered by category)
- Show related categories

Create:

- `src/components/category/CategoryHeader.tsx`

**Iteration 8: Industry Pages**

Create `src/app/industry/[slug]/page.tsx`:

- Similar to category page
- Industry-specific content
- "Top tools for {industry}" section

Create:

- `src/components/industry/IndustryHeader.tsx`

### PHASE 4: Polish & Optimization (Iteration 9-10)

**Iteration 9: SEO & Metadata**

Implement:

1. Dynamic metadata for all pages
2. Sitemap generation (`src/app/sitemap.ts`)
3. Robots.txt (`src/app/robots.ts`)
4. JSON-LD structured data (Organization, Product, BreadcrumbList)
5. Open Graph images (og-image generation)

**Iteration 10: Performance & Deployment**

Optimize:

1. Image optimization (Next.js Image component)
2. Code splitting (dynamic imports)
3. Font optimization (next/font)
4. Database query optimization (add indexes)
5. Loading states and error boundaries
6. Responsive design testing (mobile, tablet, desktop)

Deployment:

1. Environment variables setup
2. Build test: `npm run build`
3. Deploy to Vercel
4. Setup PostgreSQL on Supabase
5. Run production seed
6. Custom domain configuration
7. SSL certificate
8. Analytics setup (optional: Google Analytics 4)

---

## 📋 QUALITY CHECKLIST

Before marking MVP complete, verify:

**Functionality:**

- [ ] All 185 tools display correctly
- [ ] Search works (finds tools by name, description)
- [ ] Filters work (category, industry, pricing)
- [ ] Sort works (popular, latest, rating, A-Z)
- [ ] Pagination/infinite scroll works
- [ ] Tool detail pages load for all 185 tools
- [ ] Category pages work (all categories)
- [ ] Industry pages work (all industries)
- [ ] Links are correct (no 404s)
- [ ] Affiliate links track properly

**Design:**

- [ ] Responsive: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- [ ] All images load correctly (logos, thumbnails)
- [ ] Icons display properly
- [ ] Typography is consistent
- [ ] Colors match design system
- [ ] Loading states show during data fetch
- [ ] Error states display helpful messages
- [ ] Buttons have hover/active states
- [ ] Forms validate properly

**Performance:**

- [ ] Homepage loads <2 seconds
- [ ] Tool listing loads <3 seconds
- [ ] Tool detail loads <2 seconds
- [ ] Images are optimized (WebP, lazy loading)
- [ ] No console errors or warnings
- [ ] Lighthouse score >90 (Performance, Accessibility, Best Practices, SEO)

**SEO:**

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Open Graph tags present
- [ ] Structured data (JSON-LD) implemented
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] URLs are clean (no special characters)
- [ ] Breadcrumbs on detail pages

**Code Quality:**

- [ ] TypeScript strict mode (no `any` types)
- [ ] No ESLint errors
- [ ] Code is formatted (Prettier)
- [ ] Components are reusable
- [ ] No duplicate code
- [ ] Error boundaries implemented
- [ ] Loading states for async operations
- [ ] Proper TypeScript types for all props/functions

---

## 🎯 SUCCESS CRITERIA

**MVP is complete when:**

1. ✅ All 185 tools are seeded in database
2. ✅ Homepage displays correctly with real data
3. ✅ Tools listing works with search, filters, sort
4. ✅ Tool detail pages display all information correctly
5. ✅ Category and industry pages work
6. ✅ Site is responsive (mobile, tablet, desktop)
7. ✅ SEO metadata is complete (all pages)
8. ✅ Build succeeds without errors (`npm run build`)
9. ✅ Deployed to Vercel and accessible via custom domain
10. ✅ No critical bugs or broken features

**Definition of "Production-Ready":**

- A real user can visit the site, browse tools, read details, and click affiliate links
- Site works on all major browsers (Chrome, Safari, Firefox, Edge)
- No crashes, no data loading failures
- Professional appearance, clean code
- Ready to show in portfolio and share with users

---

## 💬 COMMUNICATION PROTOCOL

**When starting each iteration:**

1. State clearly: "Iteration X: [Task Name]"
2. List files that will be created/modified
3. Briefly explain the approach (1-2 sentences)

**When writing code:**

1. Always include full file path
2. Include complete file content (not just snippets)
3. Add brief comments for complex logic only
4. Use TypeScript types everywhere

**After each iteration:**

1. List commands to run (if any): `npm run dev`, `npm run db:push`, etc.
2. What to verify: "Check http://localhost:3000/tools"
3. Expected outcome: "Should display 185 tools in grid"

**If you encounter issues:**

1. Explain the problem clearly
2. Suggest 2-3 solutions
3. Ask for direction if needed (don't guess)

**Code style preferences:**

- Use arrow functions for components: `const Component = () => {}`
- Use async/await (not .then())
- Destructure props: `({ prop1, prop2 }) =>`
- Use early returns for error states
- Prefer Server Components (only use 'use client' when needed)
- Use Tailwind utility classes (not custom CSS)

---

## 📝 FINAL NOTES

**This is your first web project** - emphasis on:

- Learning Next.js App Router properly
- Understanding Prisma ORM
- Building production-ready code (not just prototypes)
- SEO best practices
- Responsive design

**After MVP is complete:**

- You'll have a portfolio-worthy web project
- Foundation for future app version (React Native)
- Potential passive income from affiliates
- Experience to list on CV/LinkedIn

**What makes this project unique:**

- Real data (185+ tools with complete info)
- Production-ready from day 1
- SEO-optimized for organic growth
- Monetization-ready (affiliate links)
- Extensible (easy to add features later)

**Post-MVP Phase 2 features** (optional, after core is working):

- User authentication (NextAuth with Google/GitHub)
- User reviews & ratings
- Bookmark/save functionality
- Tool comparison (side-by-side)
- Blog section for SEO content
- Admin dashboard for managing tools
- Analytics dashboard (track popular tools)

**Remember:**

- Focus on completing Phase 1 (MVP) first
- Quality over speed - make it work correctly
- Test each iteration before moving to next
- Ask questions if requirements are unclear
- Document decisions in code comments

---

## 🚀 START COMMAND

To begin, Claude Opus 4.6 should:

1. Read this entire specification
2. Verify all provided files are present:
   - schema.prisma
   - package.json, tsconfig.json, tailwind.config.ts, next.config.js
   - 3 seed data JSON files
   - README.md, CONTENT_STRATEGY.md, PROJECT_ROADMAP.md
3. Respond with:
   - Confirmation you understand the project
   - A brief technical plan for Phase 1 (list of iterations with file paths)
   - Any clarifying questions before starting

Then proceed with **Iteration 1: Project Setup** when approved.

**Let's build AI Tools Hub! 🎉**
