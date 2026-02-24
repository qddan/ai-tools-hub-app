"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useCallback } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { tools: number };
}

interface ToolsFilterProps {
  categories: Category[];
  currentCategory: string;
  currentPricing: string;
  currentSort: string;
  currentSearch: string;
}

export function ToolsFilter({
  categories,
  currentCategory,
  currentPricing,
  currentSort,
  currentSearch,
}: ToolsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/tools?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  const clearFilters = () => {
    router.push("/tools");
    setSearch("");
  };

  const hasFilters = currentCategory || currentPricing || currentSearch || currentSort !== "popular";

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools by name, description, or developer..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort */}
        <div className="flex gap-1 rounded-lg border p-1">
          {[
            { label: "Popular", value: "popular" },
            { label: "Top Rated", value: "rating" },
            { label: "Latest", value: "latest" },
            { label: "A-Z", value: "name" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParams("sort", opt.value === "popular" ? "" : opt.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                currentSort === opt.value || (!currentSort && opt.value === "popular")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex gap-1 rounded-lg border p-1">
          {[
            { label: "All", value: "" },
            { label: "Free", value: "free" },
            { label: "Paid", value: "paid" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParams("pricing", opt.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                currentPricing === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
            <X className="h-3.5 w-3.5" /> Clear filters
          </Button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams("category", "")}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            !currentCategory
              ? "bg-blue-600 text-white"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateParams("category", cat.slug)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              currentCategory === cat.slug
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name} ({cat._count.tools})
          </button>
        ))}
      </div>
    </div>
  );
}
