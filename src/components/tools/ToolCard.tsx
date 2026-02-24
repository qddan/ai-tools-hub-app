import Link from "next/link";
import Image from "next/image";
import { Star, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ToolWithRelations } from "@/types";

interface ToolCardProps {
  tool: ToolWithRelations;
}

export function ToolCard({ tool }: ToolCardProps) {
  const plans = tool.pricingPlans;
  let pricingLabel = "Contact";
  if (plans.length > 0) {
    const hasFree = plans.some(
      (p: { price: number | null }) => p.price === null || p.price === 0,
    );
    if (hasFree) {
      pricingLabel = "Free";
    } else {
      const prices = plans
        .filter((p: { price: number | null }) => p.price != null)
        .map((p: { price: number | null }) => p.price!);
      pricingLabel =
        prices.length > 0 ? `From $${Math.min(...prices)}/mo` : "Contact";
    }
  }

  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:border-blue-200">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-muted">
              {tool.logoUrl ? (
                <Image
                  src={tool.logoUrl}
                  alt={tool.name}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
                  {tool.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                {tool.isFeatured && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-amber-100 text-amber-800 text-xs"
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{tool.developer}</p>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {tool.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {tool.categories
              .slice(0, 2)
              .map((tc: { category: { id: string; name: string } }) => (
                <Badge
                  key={tc.category.id}
                  variant="outline"
                  className="text-xs"
                >
                  {tc.category.name}
                </Badge>
              ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              {tool.rating > 0 && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="font-medium">{tool.rating.toFixed(1)}</span>
                </span>
              )}
              <span className="flex items-center gap-1 text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                {tool.views.toLocaleString()}
              </span>
            </div>
            <span className="font-medium text-blue-600">{pricingLabel}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
