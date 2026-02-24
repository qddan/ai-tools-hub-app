import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  ExternalLink,
  Github,
  ArrowRight,
  Server,
  Cpu,
  Globe,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MCP Servers Directory - Model Context Protocol",
  description:
    "Discover the best MCP (Model Context Protocol) servers. Browse by category, difficulty, and popularity. Connect AI models to external tools and data sources.",
};

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800",
  "Beginner-Intermediate": "bg-lime-100 text-lime-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

const categoryIcon: Record<string, string> = {
  "Local Development": "📁",
  "Browser Automation": "🌐",
  "Version Control": "🐙",
  "Code Execution": "🐍",
  "Web Search & Research": "🔍",
  "AI Memory": "🧠",
  Database: "🗄️",
  Productivity: "📝",
  Communication: "💬",
  DevOps: "🐳",
  Cloud: "☁️",
  "Backend/Full-Stack": "🔧",
};

export default async function McpPage() {
  const servers = await prisma.mcpServer.findMany({
    where: { isActive: true },
    orderBy: { popularityRank: "asc" },
  });

  const categories = [...new Set(servers.map((s) => s.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Server className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold">MCP Servers</h1>
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          Model Context Protocol (MCP) chuẩn hóa cách AI models kết nối với
          external tools, data sources và systems. Khám phá các MCP servers phổ
          biến nhất.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Cpu className="h-4 w-4" /> {servers.length} Servers
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="h-4 w-4" /> {categories.length} Categories
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4" /> Open Protocol by Anthropic
          </span>
        </div>
      </div>

      {/* What is MCP */}
      <Card className="mb-10">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-bold">MCP là gì?</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            <strong>Model Context Protocol (MCP)</strong> là giao thức mở do
            Anthropic phát triển, chuẩn hóa cách AI models (Claude, ChatGPT,
            Gemini...) kết nối với external tools và data sources. Trước MCP,
            developers phải build custom connectors cho mỗi AI model × data
            source (N×M problem). MCP cung cấp universal interface — chỉ cần
            implement 1 lần.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="font-semibold">🔌 Universal Interface</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Kết nối bất kỳ AI model nào với bất kỳ tool nào qua 1 protocol
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-semibold">🔓 Open Protocol</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Không vendor lock-in, được Linux Foundation quản lý
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="font-semibold">⚡ JSON-RPC 2.0</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Client-Server architecture, tương tự Language Server Protocol
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className="px-3 py-1.5 text-sm"
            >
              {categoryIcon[cat] || "📦"} {cat} (
              {servers.filter((s) => s.category === cat).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Server Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <Link key={server.id} href={`/mcp/${server.slug}`}>
            <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:border-blue-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{server.icon || "📦"}</span>
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                        {server.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {server.category}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      difficultyColor[server.difficulty] ||
                      "bg-gray-100 text-gray-800"
                    }
                  >
                    {server.difficulty}
                  </Badge>
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {server.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {server.useCases
                    ?.split("|")
                    .slice(0, 3)
                    .map((uc, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {uc.trim()}
                      </Badge>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    {server.githubStars && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-3.5 w-3.5" />
                        {server.githubStars}
                      </span>
                    )}
                    {server.githubUrl && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Github className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                    View Details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Deployment Types */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Deployment Types
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                💻 Local
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                MCP server chạy trên máy local, giao tiếp qua STDIO. Bảo mật
                cao, tốc độ nhanh, không cần internet.
              </p>
              <p className="mt-3 text-xs font-medium text-green-700">
                Best for: Individual developers, privacy-sensitive tasks
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                🌍 Remote
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                MCP server host trên cloud, connect qua HTTP/HTTPS. Setup nhanh,
                scalable, truy cập từ mọi device.
              </p>
              <p className="mt-3 text-xs font-medium text-blue-700">
                Best for: SaaS integrations, team collaboration
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                🐳 Managed
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                MCP server chạy trong containers (Docker/K8s). Centralized
                management, isolated environments.
              </p>
              <p className="mt-3 text-xs font-medium text-purple-700">
                Best for: Enterprise deployments, team shared resources
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-muted/50 p-8 text-center">
        <h2 className="text-2xl font-bold">Bắt đầu với MCP</h2>
        <p className="mt-2 text-muted-foreground">
          Tìm hiểu thêm về Model Context Protocol và cách kết nối AI với tools
          của bạn.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              MCP Official Docs <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="h-4 w-4" /> GitHub Repository
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
