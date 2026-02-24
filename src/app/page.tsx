import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ToolCard } from "@/components/tools/ToolCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Search,
  Server,
  Zap,
  LayoutGrid,
  Globe,
  Star,
} from "lucide-react";
import type { ToolWithRelations } from "@/types";

export const revalidate = 86400;

async function getHomeData() {
  const [
    toolCount,
    categoryCount,
    industryCount,
    mcpCount,
    mcpCategories,
    featuredTools,
    trendingTools,
    categories,
    topMcpServers,
  ] = await Promise.all([
    prisma.tool.count({ where: { isActive: true } }),
    prisma.category.count(),
    prisma.industry.count(),
    prisma.mcpServer.count({ where: { isActive: true } }),
    prisma.mcpServer.findMany({
      where: { isActive: true },
      select: { category: true },
    }),
    prisma.tool.findMany({
      where: { isActive: true, isFeatured: true },
      take: 8,
      orderBy: { rating: "desc" },
      include: {
        categories: { include: { category: true } },
        industries: { include: { industry: true } },
        tags: { include: { tag: true } },
        features: true,
        useCases: true,
      },
    }),
    prisma.tool.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { views: "desc" },
      include: {
        categories: { include: { category: true } },
        industries: { include: { industry: true } },
        tags: { include: { tag: true } },
        features: true,
        useCases: true,
      },
    }),
    prisma.category.findMany({
      include: { _count: { select: { tools: true } } },
      orderBy: { tools: { _count: "desc" } },
      take: 12,
    }),
    prisma.mcpServer.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { popularityRank: "asc" },
    }),
  ]);

  const mcpCatCount = new Set(mcpCategories.map((m) => m.category)).size;

  return {
    toolCount,
    categoryCount,
    industryCount,
    mcpCount,
    mcpCatCount,
    featuredTools,
    trendingTools,
    categories,
    topMcpServers,
  };
}

export default async function Home() {
  const {
    toolCount,
    categoryCount,
    industryCount,
    mcpCount,
    mcpCatCount,
    featuredTools,
    trendingTools,
    categories,
    topMcpServers,
  } = await getHomeData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/30 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {toolCount} AI Tools + {mcpCount} MCP Servers
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            The Directory for
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {" "}
              AI Tools &amp; MCP Servers
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Search, compare, and discover {toolCount}+ AI tools and {mcpCount}{" "}
            MCP servers. Real ratings, usage stats, and reviews.
          </p>

          {/* Unified Search */}
          <form action="/tools" method="get" className="mx-auto mt-6 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                name="search"
                placeholder="Search AI tools, MCP servers, categories..."
                className="h-12 w-full rounded-xl border bg-background pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button size="sm" asChild>
              <Link href="/tools" className="gap-1.5">
                <Zap className="h-3.5 w-3.5" /> AI Tools
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/mcp" className="gap-1.5">
                <Server className="h-3.5 w-3.5" /> MCP Servers
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/categories" className="gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5" /> Categories
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/industries" className="gap-1.5">
                <Globe className="h-3.5 w-3.5" /> Industries
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="border-b py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 text-sm sm:gap-10 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl font-bold">{toolCount}</span>
            <span className="text-muted-foreground">AI Tools</span>
          </Link>
          <Link
            href="/mcp"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl font-bold">{mcpCount}</span>
            <span className="text-muted-foreground">MCP Servers</span>
          </Link>
          <Link
            href="/categories"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl font-bold">{categoryCount}</span>
            <span className="text-muted-foreground">Categories</span>
          </Link>
          <Link
            href="/industries"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl font-bold">{industryCount}</span>
            <span className="text-muted-foreground">Industries</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{mcpCatCount}</span>
            <span className="text-muted-foreground">MCP Categories</span>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold">Featured Tools</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tools?sort=rating" className="gap-1 text-xs">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-card">
            {(featuredTools as ToolWithRelations[]).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending + MCP Side by Side */}
      <section className="bg-muted/30 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Trending Tools */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-bold">Trending AI Tools</h2>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tools" className="gap-1 text-xs">
                    View all <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg border bg-card">
                {(trendingTools as ToolWithRelations[]).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>

            {/* Top MCP Servers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-bold">Top MCP Servers</h2>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/mcp" className="gap-1 text-xs">
                    View all <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg border bg-card">
                {topMcpServers.map((server) => (
                  <Link
                    key={server.id}
                    href={`/mcp/${server.slug}`}
                    className="group flex items-center gap-3 border-b px-4 py-3 transition-colors hover:bg-muted/50 last:border-b-0"
                  >
                    <span className="text-xl shrink-0">
                      {server.icon || "📦"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold group-hover:text-blue-600 transition-colors truncate">
                          {server.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {server.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {server.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground shrink-0">
                      #{server.popularityRank}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-violet-600" />
              <h2 className="text-lg font-bold">Browse by Category</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/categories" className="gap-1 text-xs">
                All categories <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex items-center justify-between rounded-lg border bg-card px-4 py-3 transition-all hover:shadow-sm hover:border-blue-200"
              >
                <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {cat._count.tools}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/50 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold">
            Find the Perfect AI Tool for Your Workflow
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {toolCount} AI tools + {mcpCount} MCP servers. Search, compare, and
            choose.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button size="sm" asChild>
              <Link href="/tools" className="gap-1.5">
                Browse AI Tools <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/mcp" className="gap-1.5">
                Explore MCP Servers <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
