import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle,
  X,
  Star,
  Target,
  BookOpen,
  Server,
} from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 86400;

interface McpPageProps {
  params: Promise<{ slug: string }>;
}

async function getMcpServer(slug: string) {
  return prisma.mcpServer.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: McpPageProps): Promise<Metadata> {
  const { slug } = await params;
  const server = await getMcpServer(slug);
  if (!server) return { title: "MCP Server Not Found" };

  return {
    title: `${server.name} - MCP Server`,
    description: server.description,
    openGraph: {
      title: `${server.name} - MCP Servers | AI Tools Hub`,
      description: server.description,
      type: "website",
    },
  };
}

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800",
  "Beginner-Intermediate": "bg-lime-100 text-lime-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

export default async function McpServerPage({ params }: McpPageProps) {
  const { slug } = await params;
  const server = await getMcpServer(slug);

  if (!server) notFound();

  const pros = server.pros ? server.pros.split("|") : [];
  const cons = server.cons ? server.cons.split("|") : [];
  const useCases = server.useCases ? server.useCases.split("|") : [];
  const bestFor = server.bestFor ? server.bestFor.split("|") : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/mcp" className="gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to MCP Servers
          </Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-5">
            <span className="text-5xl">{server.icon || "📦"}</span>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{server.name}</h1>
                <Badge
                  className={
                    difficultyColor[server.difficulty] ||
                    "bg-gray-100 text-gray-800"
                  }
                >
                  {server.difficulty}
                </Badge>
              </div>
              <p className="mt-1 text-muted-foreground">{server.category}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {server.githubStars && (
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{server.githubStars}</span>
                    <span className="text-sm text-muted-foreground">stars</span>
                  </span>
                )}
                <Badge variant="outline">
                  <Server className="mr-1 h-3 w-3" /> Rank #
                  {server.popularityRank}
                </Badge>
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed">{server.description}</p>

          {server.longDescription && (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {server.longDescription}
            </p>
          )}

          {/* Use Cases */}
          {useCases.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {useCases.map((uc, i) => (
                <Badge key={i} variant="secondary">
                  {uc.trim()}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-3">
              {server.websiteUrl && (
                <Button className="w-full gap-2" size="lg" asChild>
                  <a
                    href={server.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              {server.githubUrl && (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                  asChild
                >
                  <a
                    href={server.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              )}

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{server.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium">{server.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Popularity</span>
                  <span className="font-medium">
                    Rank #{server.popularityRank}
                  </span>
                </div>
                {server.githubStars && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GitHub Stars</span>
                    <span className="font-medium">{server.githubStars}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          {(pros.length > 0 || cons.length > 0) && (
            <Card>
              <CardContent className="p-6">
                {pros.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-green-700">
                      <CheckCircle className="h-4 w-4" /> Ưu điểm
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {pros.map((pro, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                          {pro.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {cons.length > 0 && (
                  <div className={pros.length > 0 ? "mt-4" : ""}>
                    <h3 className="flex items-center gap-2 font-semibold text-red-700">
                      <X className="h-4 w-4" /> Nhược điểm
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {cons.map((con, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                        >
                          <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                          {con.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Best For & Setup Guide */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Best For */}
        {bestFor.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Target className="h-5 w-5 text-violet-600" /> Phù hợp nhất cho
              </h2>
              <ul className="mt-4 space-y-2">
                {bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Setup Guide */}
        {server.setupGuide && (
          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <BookOpen className="h-5 w-5 text-blue-600" /> Hướng dẫn cài
                đặt
              </h2>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {server.setupGuide}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Related Resources */}
      <div className="mt-12 rounded-2xl bg-muted/50 p-8 text-center">
        <h2 className="text-xl font-bold">Tìm hiểu thêm về MCP</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Khám phá thêm các MCP servers và tài nguyên hữu ích
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/mcp" className="gap-2">
              <Server className="h-4 w-4" /> All MCP Servers
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              MCP Docs <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
