import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Github, Server, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MCP Servers Directory - Model Context Protocol",
  description:
    "Discover the best MCP (Model Context Protocol) servers. Browse by category, difficulty, and popularity. Connect AI models to external tools and data sources.",
};

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Beginner-Intermediate":
    "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
  Intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

interface McpPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    difficulty?: string;
  }>;
}

export default async function McpPage({ searchParams }: McpPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const categoryFilter = params.category || "";
  const difficultyFilter = params.difficulty || "";

  const allServers = await prisma.mcpServer.findMany({
    where: { isActive: true },
    orderBy: { popularityRank: "asc" },
  });

  let servers = allServers;
  if (search) {
    const q = search.toLowerCase();
    servers = servers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    );
  }
  if (categoryFilter) {
    servers = servers.filter((s) => s.category === categoryFilter);
  }
  if (difficultyFilter) {
    servers = servers.filter((s) => s.difficulty === difficultyFilter);
  }

  const categories = [...new Set(allServers.map((s) => s.category))];
  const difficulties = [...new Set(allServers.map((s) => s.difficulty))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Server className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">MCP Servers Directory</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {servers.length} of {allServers.length} MCP servers
          {search && (
            <>
              {" "}
              matching &quot;
              <span className="font-medium text-foreground">{search}</span>
              &quot;
            </>
          )}{" "}
          &mdash; Model Context Protocol connects AI models to external tools
          &amp; data sources.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <form className="relative flex-1 max-w-md" action="/mcp" method="get">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            name="search"
            placeholder="Search MCP servers..."
            defaultValue={search}
            className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {categoryFilter && (
            <input type="hidden" name="category" value={categoryFilter} />
          )}
          {difficultyFilter && (
            <input type="hidden" name="difficulty" value={difficultyFilter} />
          )}
        </form>
        <div className="flex flex-wrap gap-1.5">
          <Link
            href="/mcp"
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              !categoryFilter && !difficultyFilter
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/mcp?category=${encodeURIComponent(cat)}${search ? `&search=${search}` : ""}`}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
        <div className="flex gap-1.5">
          {difficulties.map((d) => (
            <Link
              key={d}
              href={`/mcp?difficulty=${d}${search ? `&search=${search}` : ""}${categoryFilter ? `&category=${categoryFilter}` : ""}`}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                difficultyFilter === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </Link>
          ))}
        </div>
      </div>

      {/* Directory List */}
      <div className="rounded-lg border bg-card">
        {servers.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No MCP servers found.{" "}
            <Link href="/mcp" className="text-blue-600 underline">
              Clear filters
            </Link>
          </div>
        ) : (
          servers.map((server) => (
            <Link
              key={server.id}
              href={`/mcp/${server.slug}`}
              className="group flex items-start gap-4 border-b px-4 py-4 transition-colors hover:bg-muted/50 last:border-b-0"
            >
              <span className="text-2xl shrink-0">{server.icon || "📦"}</span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm group-hover:text-blue-600 transition-colors">
                    {server.name}
                  </h3>
                  <Badge
                    className={`text-[10px] px-1.5 py-0 ${
                      difficultyColor[server.difficulty] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {server.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {server.category}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                  {server.description}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {server.useCases
                    ?.split("|")
                    .slice(0, 4)
                    .map((uc, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {uc.trim()}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                {server.githubStars && (
                  <span
                    className="flex items-center gap-1"
                    title="GitHub Stars"
                  >
                    <Star className="h-3.5 w-3.5" />
                    {server.githubStars}
                  </span>
                )}
                {server.githubUrl && <Github className="h-3.5 w-3.5" />}
                <span className="text-[10px] font-medium">
                  #{server.popularityRank}
                </span>
                <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-xl bg-muted/50 p-6 text-center">
        <p className="text-sm font-medium">
          Learn more about Model Context Protocol
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" asChild>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              MCP Docs <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
