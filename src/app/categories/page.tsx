import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Tool Categories",
  description: "Browse AI tools by category. Find the perfect tool for coding, writing, design, marketing, and more.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { tools: true } } },
    orderBy: { tools: { _count: "desc" } },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">AI Tool Categories</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse {categories.length} categories to find the right AI tool
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-blue-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h2>
              <Badge variant="secondary">{cat._count.tools} tools</Badge>
            </div>
            {cat.description && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {cat.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
