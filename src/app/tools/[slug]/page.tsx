import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ExternalLink,
  Eye,
  MousePointerClick,
  CheckCircle,
  Globe,
  ArrowLeft,
  Zap,
  Target,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 86400;

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

async function getTool(slug: string) {
  return prisma.tool.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      industries: { include: { industry: true } },
      tags: { include: { tag: true } },
      pricingPlans: true,
      features: true,
      useCases: true,
      reviews: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - AI Tools Hub`,
      description: tool.description,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) notFound();

  const pros = tool.pros ? tool.pros.split("|") : [];
  const cons = tool.cons ? tool.cons.split("|") : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/tools" className="gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border bg-muted">
              {tool.logoUrl ? (
                <Image
                  src={tool.logoUrl}
                  alt={tool.name}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                  {tool.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                {tool.isFeatured && (
                  <Badge className="bg-amber-100 text-amber-800">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-muted-foreground">by {tool.developer}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {tool.rating > 0 && (
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">
                      {tool.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({tool.reviewCount} reviews)
                    </span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" /> {tool.views.toLocaleString()}{" "}
                  views
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MousePointerClick className="h-4 w-4" />{" "}
                  {tool.clicks.toLocaleString()} clicks
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed">{tool.description}</p>

          {tool.longDescription && (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {tool.longDescription}
            </p>
          )}

          {/* Categories & Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {tool.categories.map((tc) => (
              <Link
                key={tc.category.id}
                href={`/categories/${tc.category.slug}`}
              >
                <Badge
                  variant="secondary"
                  className="hover:bg-blue-100 transition-colors"
                >
                  {tc.category.name}
                </Badge>
              </Link>
            ))}
            {tool.tags.map((tt) => (
              <Badge key={tt.tag.id} variant="outline">
                {tt.tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <Button className="w-full gap-2" size="lg" asChild>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4" /> Visit Website
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Developer</span>
                  <span className="font-medium">{tool.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platforms</span>
                  <span className="font-medium">{tool.platforms}</span>
                </div>
                {tool.industries.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industries</span>
                    <span className="text-right font-medium">
                      {tool.industries.map((ti) => ti.industry.name).join(", ")}
                    </span>
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
                      <ThumbsUp className="h-4 w-4" /> Pros
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
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
                      <ThumbsDown className="h-4 w-4" /> Cons
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
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

      {/* Tabs Section */}
      <Tabs defaultValue="features" className="mt-12">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="usecases">Use Cases</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-6">
          {tool.features.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tool.features.map((feature) => (
                <Card key={feature.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Zap className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">{feature.name}</h3>
                        {feature.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No feature details available.
            </p>
          )}
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          {tool.pricingPlans.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tool.pricingPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={
                    plan.isPopular ? "border-blue-600 ring-1 ring-blue-600" : ""
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {plan.isPopular && (
                        <Badge className="bg-blue-600">Popular</Badge>
                      )}
                    </div>
                    <div className="mt-2">
                      {plan.price === null || plan.price === 0 ? (
                        <span className="text-3xl font-bold">Free</span>
                      ) : (
                        <div>
                          <span className="text-3xl font-bold">
                            ${plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-muted-foreground">
                              /{plan.period}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.split("|").map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {f.trim()}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No pricing information available. Visit the website for details.
            </p>
          )}
        </TabsContent>

        <TabsContent value="usecases" className="mt-6">
          {tool.useCases.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {tool.useCases.map((uc) => (
                <Card key={uc.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Target className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                      <div>
                        <h3 className="font-semibold">{uc.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {uc.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No use case details available.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
