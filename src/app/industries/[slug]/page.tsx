import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { ToolWithRelations } from "@/types";

export const revalidate = 86400;

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await prisma.industry.findUnique({ where: { slug } });
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `AI Tools for ${industry.name}`,
    description:
      industry.description ||
      `Browse AI tools for the ${industry.name} industry.`,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await prisma.industry.findUnique({
    where: { slug },
    include: {
      tools: {
        include: {
          tool: {
            include: {
              categories: { include: { category: true } },
              industries: { include: { industry: true } },
              tags: { include: { tag: true } },
              features: true,
              useCases: true,
            },
          },
        },
      },
    },
  });

  if (!industry) notFound();

  const tools = industry.tools.map(
    (ti: { tool: ToolWithRelations }) => ti.tool,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/industries" className="gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> All Industries
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Tools for {industry.name}</h1>
        {industry.description && (
          <p className="mt-2 text-lg text-muted-foreground">
            {industry.description}
          </p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          {tools.length} tools
        </p>
      </div>

      {tools.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No tools for this industry yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool: ToolWithRelations) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
