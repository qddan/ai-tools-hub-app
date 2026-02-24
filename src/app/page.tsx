import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ToolCard } from "@/components/tools/ToolCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Search,
  TrendingUp,
  Star,
  Zap,
  LayoutGrid,
} from "lucide-react";

export const revalidate = 86400;

async function getHomeData() {
  const [toolCount, categoryCount, featuredTools, trendingTools, categories] =
    await Promise.all([
      prisma.tool.count({ where: { isActive: true } }),
      prisma.category.count(),
      prisma.tool.findMany({
        where: { isActive: true, isFeatured: true },
        take: 6,
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
        take: 6,
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
    ]);

  return { toolCount, categoryCount, featuredTools, trendingTools, categories };
}

export default async function Home() {
  const { toolCount, categoryCount, featuredTools, trendingTools, categories } =
    await getHomeData();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {toolCount}+ AI Tools &amp; Growing
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Discover &amp; Compare
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              the Best AI Tools
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Browse {toolCount}+ curated AI tools across {categoryCount}{" "}
            categories. Find the perfect tool for coding, writing, design,
            marketing, and more.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/tools" className="gap-2">
                <Search className="h-4 w-4" />
                Browse All Tools
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/categories" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                View Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { label: "AI Tools", value: `${toolCount}+`, icon: Zap },
            {
              label: "Categories",
              value: categoryCount.toString(),
              icon: LayoutGrid,
            },
            { label: "Average Rating", value: "4.5", icon: Star },
            { label: "Updated Daily", value: "24h", icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Featured Tools</h2>
              <p className="mt-1 text-muted-foreground">
                Handpicked AI tools that stand out
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/tools?sort=rating" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Trending Now</h2>
              <p className="mt-1 text-muted-foreground">
                Most viewed tools this week
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/tools?sort=popular" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Browse by Category
              </h2>
              <p className="mt-1 text-muted-foreground">
                Find tools by what you need
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/categories" className="gap-1">
                All categories <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <Badge variant="secondary">{cat._count.tools}</Badge>
                </div>
                {cat.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-violet-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Find Your Perfect AI Tool?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Join thousands of professionals who use AI Tools Hub to discover and
            compare the best AI tools for their work.
          </p>
          <Button size="lg" variant="secondary" className="mt-8" asChild>
            <Link href="/tools">
              Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
