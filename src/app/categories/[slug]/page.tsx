import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { ToolWithRelations } from "@/types";

export const revalidate = 86400;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} AI Tools`,
    description:
      category.description ||
      `Browse AI tools in the ${category.name} category.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
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

  if (!category) notFound();

  const tools = category.tools.map((tc) => tc.tool) as ToolWithRelations[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/categories" className="gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> All Categories
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          {tools.length} tools
        </p>
      </div>

      {tools.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No tools in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
