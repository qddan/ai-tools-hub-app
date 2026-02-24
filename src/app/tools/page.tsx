import { prisma } from "@/lib/prisma";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolsFilter } from "@/components/tools/ToolsFilter";
import { Button } from "@/components/ui/button";
import { TOOLS_PER_PAGE } from "@/lib/constants";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Prisma } from "@prisma/client";
import type { ToolWithRelations } from "@/types";

export const revalidate = 86400;

export const metadata = {
  title: "Browse AI Tools",
  description:
    "Explore our curated collection of AI tools. Filter by category, pricing, and more.",
};

interface ToolsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const categorySlug = params.category || "";
  const sort = params.sort || "popular";
  const page = parseInt(params.page || "1", 10);

  // Build where clause
  const where: Prisma.ToolWhereInput = { isActive: true };

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { developer: { contains: search } },
    ];
  }

  if (categorySlug) {
    where.categories = {
      some: { category: { slug: categorySlug } },
    };
  }

  // Build orderBy
  let orderBy: Prisma.ToolOrderByWithRelationInput = { views: "desc" };
  if (sort === "rating") orderBy = { rating: "desc" };
  else if (sort === "latest") orderBy = { createdAt: "desc" };
  else if (sort === "name") orderBy = { name: "asc" };

  const [tools, totalCount, categories] = await Promise.all([
    prisma.tool.findMany({
      where,
      orderBy,
      skip: (page - 1) * TOOLS_PER_PAGE,
      take: TOOLS_PER_PAGE,
      include: {
        categories: { include: { category: true } },
        industries: { include: { industry: true } },
        tags: { include: { tag: true } },
        features: true,
        useCases: true,
      },
    }),
    prisma.tool.count({ where }),
    prisma.category.findMany({
      include: { _count: { select: { tools: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / TOOLS_PER_PAGE);

  // Build pagination URL helper
  function buildUrl(newPage: number) {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (categorySlug) p.set("category", categorySlug);
    if (sort && sort !== "popular") p.set("sort", sort);
    if (newPage > 1) p.set("page", newPage.toString());
    const qs = p.toString();
    return `/tools${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Browse AI Tools</h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} tools found
            {search && (
              <>
                {" "}
                for &quot;
                <span className="font-medium text-foreground">{search}</span>
                &quot;
              </>
            )}
            {categorySlug && (
              <>
                {" "}
                in{" "}
                <span className="font-medium text-foreground">
                  {categories.find((c) => c.slug === categorySlug)?.name ||
                    categorySlug}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <ToolsFilter
        categories={categories}
        currentCategory={categorySlug}
        currentSort={sort}
        currentSearch={search}
      />

      {/* Results - Directory List */}
      {tools.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">
            No tools found matching your criteria.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/tools">Clear Filters</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-lg border bg-card">
            {(tools as ToolWithRelations[]).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {page > 1 && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={buildUrl(page - 1)}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Link>
                </Button>
              )}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (page <= 4) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = page - 3 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      asChild={pageNum !== page}
                    >
                      {pageNum === page ? (
                        <span>{pageNum}</span>
                      ) : (
                        <Link href={buildUrl(pageNum)}>{pageNum}</Link>
                      )}
                    </Button>
                  );
                })}
              </div>
              {page < totalPages && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={buildUrl(page + 1)}>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
