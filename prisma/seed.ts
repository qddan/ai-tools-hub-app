import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface SeedTool {
  name: string;
  slug: string;
  developer: string;
  description: string;
  longDescription?: string;
  website: string;
  rating: number;
  reviewCount: number;
  views: number;
  clicks: number;
  isFeatured?: boolean;
  platforms?: string;
  pros?: string;
  cons?: string;
  logoUrl?: string;
  categories: string[];
  industries: string[];
  tags: string[];
  features: { name: string; description: string; icon?: string }[];
  useCases: { title: string; description: string; icon?: string }[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categoryMeta: Record<
  string,
  { description: string; icon: string; color: string }
> = {
  "LLM & Chatbot": {
    description: "Large language models and conversational AI assistants",
    icon: "MessageSquare",
    color: "#3B82F6",
  },
  "Code Assistant": {
    description: "AI-powered coding tools and IDE extensions",
    icon: "Code",
    color: "#8B5CF6",
  },
  Writing: {
    description: "AI writing assistants for content creation and editing",
    icon: "PenTool",
    color: "#EC4899",
  },
  "Image Generation": {
    description: "AI tools for creating and editing images",
    icon: "Image",
    color: "#F59E0B",
  },
  "Video Generation": {
    description: "AI-powered video creation and editing tools",
    icon: "Film",
    color: "#EF4444",
  },
  "Video Editing": {
    description: "AI tools for editing and enhancing video content",
    icon: "Scissors",
    color: "#F97316",
  },
  "Audio & Speech": {
    description: "Text-to-speech, voice cloning, and audio AI tools",
    icon: "Mic",
    color: "#06B6D4",
  },
  Design: {
    description: "AI design tools for graphics, UI, and visual content",
    icon: "Palette",
    color: "#D946EF",
  },
  Productivity: {
    description: "AI tools to boost work efficiency and collaboration",
    icon: "Zap",
    color: "#10B981",
  },
  Marketing: {
    description: "AI-powered marketing, advertising, and campaign tools",
    icon: "Target",
    color: "#F43F5E",
  },
  SEO: {
    description: "AI tools for search engine optimization and content ranking",
    icon: "TrendingUp",
    color: "#14B8A6",
  },
  Automation: {
    description: "AI workflow automation and integration platforms",
    icon: "RefreshCw",
    color: "#6366F1",
  },
  "Content Creation": {
    description: "AI tools for creating various types of digital content",
    icon: "FileText",
    color: "#A855F7",
  },
  "Developer Tools": {
    description: "AI infrastructure, APIs, and developer platforms",
    icon: "Terminal",
    color: "#64748B",
  },
  "Data & Analytics": {
    description: "AI-powered data analysis and business intelligence",
    icon: "BarChart",
    color: "#0EA5E9",
  },
  "Search & Research": {
    description: "AI search engines and research assistants",
    icon: "Search",
    color: "#22C55E",
  },
  "Customer Support": {
    description: "AI chatbots and customer service automation",
    icon: "Headphones",
    color: "#F97316",
  },
  Sales: {
    description: "AI tools for sales teams and revenue optimization",
    icon: "DollarSign",
    color: "#16A34A",
  },
  CRM: {
    description: "AI-enhanced customer relationship management platforms",
    icon: "Users",
    color: "#2563EB",
  },
  "Knowledge Management": {
    description: "AI tools for organizing and retrieving knowledge",
    icon: "BookOpen",
    color: "#7C3AED",
  },
  "No-Code/Low-Code": {
    description: "AI-powered platforms for building without code",
    icon: "Layers",
    color: "#059669",
  },
  "Open Source": {
    description: "Open-source AI models and frameworks",
    icon: "Github",
    color: "#171717",
  },
  "E-commerce Tools": {
    description: "AI tools for online stores and e-commerce",
    icon: "ShoppingCart",
    color: "#DC2626",
  },
  Education: {
    description: "AI tools for learning, teaching, and education",
    icon: "GraduationCap",
    color: "#4F46E5",
  },
  "3D & AR/VR": {
    description: "AI tools for 3D modeling and immersive experiences",
    icon: "Box",
    color: "#9333EA",
  },
};

const industryMeta: Record<string, { description: string; icon: string }> = {
  Technology: {
    description: "Software, SaaS, and tech companies",
    icon: "Cpu",
  },
  Education: {
    description: "Schools, universities, and e-learning platforms",
    icon: "GraduationCap",
  },
  Marketing: {
    description: "Marketing agencies, content teams, and advertisers",
    icon: "Megaphone",
  },
  Healthcare: {
    description: "Hospitals, clinics, and health tech companies",
    icon: "Heart",
  },
  Finance: {
    description: "Banks, fintech, and financial services",
    icon: "Landmark",
  },
  "E-commerce": {
    description: "Online stores, marketplaces, and retail",
    icon: "ShoppingBag",
  },
  Entertainment: {
    description: "Media, gaming, music, and content creation",
    icon: "Tv",
  },
  "Design & Creative": {
    description: "Design agencies, studios, and creative professionals",
    icon: "Palette",
  },
  Legal: {
    description: "Law firms, legal tech, and compliance",
    icon: "Scale",
  },
  "HR & Recruitment": {
    description: "HR departments and recruitment agencies",
    icon: "UserPlus",
  },
  Sales: {
    description: "Sales teams, SDRs, and revenue organizations",
    icon: "TrendingUp",
  },
  Automotive: {
    description: "Automotive and autonomous vehicle companies",
    icon: "Car",
  },
};

async function main() {
  console.log("🌱 Starting seed...");

  // Read all seed data files
  const seedDir = path.join(__dirname, "seed-data");
  const files = ["part1.json", "part2.json", "part3.json"];
  const allTools: SeedTool[] = [];

  for (const file of files) {
    const filePath = path.join(seedDir, file);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      allTools.push(...data);
      console.log(`📁 Loaded ${data.length} tools from ${file}`);
    }
  }

  console.log(`📊 Total tools to seed: ${allTools.length}`);

  // Collect unique categories, industries, tags
  const categoriesSet = new Set<string>();
  const industriesSet = new Set<string>();
  const tagsSet = new Set<string>();

  for (const tool of allTools) {
    tool.categories?.forEach((c) => categoriesSet.add(c));
    tool.industries?.forEach((i) => industriesSet.add(i));
    tool.tags?.forEach((t) => tagsSet.add(t));
  }

  // Upsert categories
  console.log(`📂 Seeding ${categoriesSet.size} categories...`);
  const categoryMap = new Map<string, string>();
  for (const name of categoriesSet) {
    const meta = categoryMeta[name] || {
      description: `Tools for ${name}`,
      icon: "Folder",
      color: "#64748B",
    };
    const cat = await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name,
        slug: slugify(name),
        description: meta.description,
        icon: meta.icon,
        color: meta.color,
      },
    });
    categoryMap.set(name, cat.id);
  }

  // Upsert industries
  console.log(`🏭 Seeding ${industriesSet.size} industries...`);
  const industryMap = new Map<string, string>();
  for (const name of industriesSet) {
    const meta = industryMeta[name] || {
      description: `AI tools for the ${name} industry`,
      icon: "Building",
    };
    const ind = await prisma.industry.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name,
        slug: slugify(name),
        description: meta.description,
        icon: meta.icon,
      },
    });
    industryMap.set(name, ind.id);
  }

  // Upsert tags
  console.log(`🏷️ Seeding ${tagsSet.size} tags...`);
  const tagMap = new Map<string, string>();
  for (const name of tagsSet) {
    const tag = await prisma.tag.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name,
        slug: slugify(name),
      },
    });
    tagMap.set(name, tag.id);
  }

  // Seed tools
  console.log(`🔧 Seeding ${allTools.length} tools...`);
  const seenSlugs = new Set<string>();

  for (const tool of allTools) {
    // Skip duplicate slugs
    if (seenSlugs.has(tool.slug)) {
      console.log(`  ⚠️ Skipping duplicate: ${tool.slug}`);
      continue;
    }
    seenSlugs.add(tool.slug);

    try {
      // Delete existing tool if it exists (for re-seeding)
      const existing = await prisma.tool.findUnique({
        where: { slug: tool.slug },
      });
      if (existing) {
        await prisma.tool.delete({ where: { slug: tool.slug } });
      }

      // Create tool
      const createdTool = await prisma.tool.create({
        data: {
          name: tool.name,
          slug: tool.slug,
          developer: tool.developer,
          description: tool.description,
          longDescription: tool.longDescription || null,
          website: tool.website,
          rating: tool.rating,
          reviewCount: tool.reviewCount || 0,
          views: tool.views || 0,
          clicks: tool.clicks || 0,
          isFeatured: tool.isFeatured || false,
          platforms: tool.platforms || "Web",
          pros: tool.pros || null,
          cons: tool.cons || null,
          logoUrl:
            tool.logoUrl ||
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.website}&size=128`,
          thumbnailUrl:
            tool.logoUrl ||
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.website}&size=128`,
        },
      });

      // Create category relations
      for (const catName of tool.categories || []) {
        const catId = categoryMap.get(catName);
        if (catId) {
          await prisma.toolCategory.create({
            data: { toolId: createdTool.id, categoryId: catId },
          });
        }
      }

      // Create industry relations
      for (const indName of tool.industries || []) {
        const indId = industryMap.get(indName);
        if (indId) {
          await prisma.toolIndustry.create({
            data: { toolId: createdTool.id, industryId: indId },
          });
        }
      }

      // Create tag relations
      for (const tagName of tool.tags || []) {
        const tagId = tagMap.get(tagName);
        if (tagId) {
          await prisma.toolTag.create({
            data: { toolId: createdTool.id, tagId: tagId },
          });
        }
      }

      // Create features
      for (const feature of tool.features || []) {
        await prisma.feature.create({
          data: {
            toolId: createdTool.id,
            name: feature.name,
            description: feature.description || null,
            icon: feature.icon || null,
          },
        });
      }

      // Create use cases
      for (const useCase of tool.useCases || []) {
        await prisma.useCase.create({
          data: {
            toolId: createdTool.id,
            title: useCase.title,
            description: useCase.description,
            icon: useCase.icon || null,
          },
        });
      }

      console.log(`  ✅ ${tool.name}`);
    } catch (error) {
      console.error(`  ❌ Error seeding ${tool.name}:`, error);
    }
  }

  // Print summary
  const toolCount = await prisma.tool.count();
  const catCount = await prisma.category.count();
  const indCount = await prisma.industry.count();
  const tagCount = await prisma.tag.count();

  // Seed MCP Servers
  console.log("\n� Seeding MCP Servers...");
  await prisma.mcpServer.deleteMany();
  const mcpData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "seed-data", "mcp-servers.json"),
      "utf-8",
    ),
  );
  for (const mcp of mcpData) {
    await prisma.mcpServer.create({
      data: {
        name: mcp.name,
        slug: mcp.slug,
        category: mcp.category,
        description: mcp.description,
        longDescription: mcp.longDescription || null,
        icon: mcp.icon || null,
        difficulty: mcp.difficulty || "Intermediate",
        popularityRank: mcp.popularityRank || 0,
        githubStars: mcp.githubStars || null,
        githubUrl: mcp.githubUrl || null,
        websiteUrl: mcp.websiteUrl || null,
        useCases: mcp.useCases || null,
        pros: mcp.pros || null,
        cons: mcp.cons || null,
        bestFor: mcp.bestFor || null,
        setupGuide: mcp.setupGuide || null,
      },
    });
    console.log(`  ✅ ${mcp.name}`);
  }

  const mcpCount = await prisma.mcpServer.count();

  console.log("\n�📊 Seed Summary:");
  console.log(`  Tools: ${toolCount}`);
  console.log(`  Categories: ${catCount}`);
  console.log(`  Industries: ${indCount}`);
  console.log(`  Tags: ${tagCount}`);
  console.log(`  MCP Servers: ${mcpCount}`);
  console.log("\n✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
