import type { Prisma } from "@prisma/client";

export type ToolWithRelations = Prisma.ToolGetPayload<{
  include: {
    categories: { include: { category: true } };
    industries: { include: { industry: true } };
    tags: { include: { tag: true } };
    pricingPlans: true;
    features: true;
    useCases: true;
  };
}>;

export type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: { _count: { select: { tools: true } } };
}>;

export type IndustryWithCount = Prisma.IndustryGetPayload<{
  include: { _count: { select: { tools: true } } };
}>;

export interface SearchParams {
  search?: string;
  category?: string;
  industry?: string;
  pricing?: string;
  sort?: string;
  page?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
