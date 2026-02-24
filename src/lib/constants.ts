export const siteConfig = {
  name: "AI Tools Hub",
  description: "Discover, Compare & Choose the Perfect AI Tool",
  tagline: "Discover 200+ AI Tools That Actually Work",
  url: "https://aitools-hub.com",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/ai-tools-hub",
    twitter: "https://twitter.com/aitoolshub",
  },
};

export const navLinks = [
  { label: "Browse Tools", href: "/tools" },
  { label: "Categories", href: "/categories" },
  { label: "Industries", href: "/industries" },
] as const;

export const footerLinks = {
  product: [
    { label: "Browse Tools", href: "/tools" },
    { label: "Categories", href: "/categories" },
    { label: "Industries", href: "/industries" },
    { label: "Compare Tools", href: "/compare" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Submit a Tool", href: "/submit" },
    { label: "API", href: "/api" },
    { label: "Changelog", href: "/changelog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const TOOLS_PER_PAGE = 20;

export const PRICING_TYPES = ["Free", "Freemium", "Paid", "Enterprise"] as const;

export const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "rating" },
  { label: "Latest", value: "latest" },
  { label: "A-Z", value: "name" },
] as const;
