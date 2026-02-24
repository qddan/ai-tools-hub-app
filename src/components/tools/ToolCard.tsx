import Link from "next/link";
import Image from "next/image";
import { Star, Eye, MousePointerClick, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ToolWithRelations } from "@/types";

interface ToolCardProps {
  tool: ToolWithRelations;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start gap-4 border-b px-4 py-4 transition-colors hover:bg-muted/50 last:border-b-0"
    >
      {/* Logo */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border bg-muted">
        {tool.logoUrl ? (
          <Image
            src={tool.logoUrl}
            alt={tool.name}
            fill
            className="object-contain p-1"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-muted-foreground">
            {tool.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm group-hover:text-blue-600 transition-colors truncate">
            {tool.name}
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            by {tool.developer}
          </span>
          {tool.isFeatured && (
            <Badge className="shrink-0 bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0">
              Featured
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
          {tool.description}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {tool.categories
            .slice(0, 3)
            .map(
              (tc: {
                category: { id: string; name: string; slug: string };
              }) => (
                <Badge
                  key={tc.category.id}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0"
                >
                  {tc.category.name}
                </Badge>
              ),
            )}
          {tool.platforms && (
            <span className="text-[10px] text-muted-foreground">
              {tool.platforms}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs text-muted-foreground">
        {tool.rating > 0 && (
          <div
            className="flex items-center gap-1 text-amber-500"
            title="Rating"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">{tool.rating.toFixed(1)}</span>
          </div>
        )}
        <div className="flex items-center gap-1" title="Views">
          <Eye className="h-3.5 w-3.5" />
          <span>{formatNumber(tool.views)}</span>
        </div>
        <div className="flex items-center gap-1" title="Clicks">
          <MousePointerClick className="h-3.5 w-3.5" />
          <span>{formatNumber(tool.clicks)}</span>
        </div>
        <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
