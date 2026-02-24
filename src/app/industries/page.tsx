import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "AI Tools by Industry",
  description: "Find AI tools tailored for your industry - technology, healthcare, finance, marketing, and more.",
};

export default async function IndustriesPage() {
  const industries = await prisma.industry.findMany({
    include: { _count: { select: { tools: true } } },
    orderBy: { tools: { _count: "desc" } },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">AI Tools by Industry</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find the best AI tools for your industry
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {industries.map((ind: { id: string; slug: string; name: string; description: string | null; _count: { tools: number } }) => (
          <Link
            key={ind.id}
            href={`/industries/${ind.slug}`}
            className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-blue-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                {ind.name}
              </h2>
              <Badge variant="secondary">{ind._count.tools} tools</Badge>
            </div>
            {ind.description && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {ind.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
