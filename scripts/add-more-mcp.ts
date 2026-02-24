import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "../prisma/seed-data/mcp-servers.json");
const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));

interface McpEntry {
  name: string; slug: string; category: string; description: string;
  longDescription: string; icon: string; difficulty: string;
  popularityRank: number; githubStars: string; githubUrl: string;
  websiteUrl: string; useCases: string; pros: string; cons: string;
  bestFor: string; setupGuide: string;
}

const more: McpEntry[] = [];
let rank = 81;

function add(name: string, slug: string, cat: string, desc: string, icon: string, diff: string, stars: string, gh: string, web: string, uc: string, pros: string, cons: string, best: string) {
  more.push({
    name, slug, category: cat, description: desc,
    longDescription: desc + " Tích hợp trực tiếp với AI models qua MCP protocol.",
    icon, difficulty: diff, popularityRank: rank++, githubStars: stars,
    githubUrl: gh, websiteUrl: web, useCases: uc, pros, cons, bestFor: best,
    setupGuide: `1. Get credentials from ${web}\n2. Install MCP server\n3. Add to claude_desktop_config.json`
  });
}

// Education & Research (3)
add("Arxiv MCP","arxiv-mcp","Web Search & Research","Arxiv paper search - academic papers, abstracts, citations","📄","Beginner","100+","https://github.com/anthropics/arxiv-mcp","https://arxiv.org","Paper search|Abstract reading|Citation analysis","Free access|Huge paper library|No auth needed","Academic papers only|No full text sometimes","Researchers|Academics|ML engineers");
add("Wikipedia MCP","wikipedia-mcp","Web Search & Research","Wikipedia API - article search, summaries, references","📖","Beginner","100+","https://github.com/anthropics/wikipedia-mcp","https://wikipedia.org","Knowledge lookup|Fact checking|Research","Free|Comprehensive|No auth needed","Quality varies|Wikipedia bias","Researchers|Students|Writers");
add("Wolfram Alpha MCP","wolfram-mcp","Code Execution","Wolfram Alpha computational intelligence - math, science, data","🧮","Intermediate","100+","https://github.com/anthropics/wolfram-mcp","https://wolframalpha.com","Math computation|Data analysis|Scientific queries","Computational power|Structured data|Accurate","API key needed|Rate limits","Scientists|Engineers|Students");

// E-commerce & Marketing (3)
add("Shopify MCP","shopify-mcp","Finance","Shopify Admin API - products, orders, customers, inventory","🛒","Intermediate","150+","https://github.com/anthropics/shopify-mcp","https://shopify.com","Product management|Order tracking|Inventory|Analytics","Rich API|Huge ecosystem|Webhooks","Shopify account needed|API complexity","E-commerce teams|Store owners|Developers");
add("Mailchimp MCP","mailchimp-mcp","Communication","Mailchimp email marketing - campaigns, lists, analytics","📬","Beginner","100+","https://github.com/anthropics/mailchimp-mcp","https://mailchimp.com","Email campaigns|List management|Analytics|Templates","Easy to use|Free tier|Analytics","Mailchimp account needed|Sending limits","Marketing teams|Email marketers|Small businesses");
add("Google Analytics MCP","ga-mcp","Data & Analytics","Google Analytics 4 - traffic, events, conversions, reports","📊","Intermediate","100+","https://github.com/anthropics/ga-mcp","https://analytics.google.com","Traffic analysis|Conversion tracking|User behavior","Free|Comprehensive|Real-time data","GA4 learning curve|Setup complexity","Marketing teams|Growth teams|Analysts");

// Storage & Files (2)
add("S3 MCP","s3-mcp","Cloud","AWS S3 operations - upload, download, manage buckets and objects","📦","Beginner","200+","https://github.com/anthropics/s3-mcp","https://aws.amazon.com/s3","File storage|Backup|CDN origin|Data lake","Scalable|Cheap storage|Durable","AWS account needed|Costs","Any team needing file storage");
add("Dropbox MCP","dropbox-mcp","Productivity","Dropbox file management - upload, download, share, search","📁","Beginner","100+","https://github.com/anthropics/dropbox-mcp","https://dropbox.com","File sharing|Team storage|Backup|Collaboration","Easy sharing|Cross-platform|Free tier","Dropbox account needed|Storage limits","Teams|File sharing|Collaboration");

// Notifications (2)
add("Twilio MCP","twilio-mcp","Communication","Twilio SMS & voice - send messages, calls, verify numbers","📱","Intermediate","150+","https://github.com/twilio/mcp-twilio","https://twilio.com","SMS sending|Voice calls|Phone verification|Alerts","Multi-channel|Reliable delivery|Global","Costs per message|Twilio account needed","Developers|Notification systems|Auth flows");
add("SendGrid MCP","sendgrid-mcp","Communication","SendGrid email delivery - transactional emails, templates","📤","Beginner","100+","https://github.com/anthropics/sendgrid-mcp","https://sendgrid.com","Transactional email|Templates|Delivery analytics","High deliverability|Templates|Analytics","SendGrid account needed|Costs at scale","SaaS apps|E-commerce|Transactional email");

// CI/CD (2)
add("GitHub Actions MCP","github-actions-mcp","DevOps","GitHub Actions - workflow management, runs, artifacts","⚙️","Intermediate","100+","https://github.com/anthropics/github-actions-mcp","https://github.com/features/actions","CI/CD pipelines|Workflow automation|Build management","Free for open source|GitHub integration|Marketplace","GitHub only|YAML complexity","Dev teams|Open source|CI/CD workflows");
add("CircleCI MCP","circleci-mcp","DevOps","CircleCI - pipelines, jobs, workflows, orbs","🔄","Intermediate","50+","https://github.com/anthropics/circleci-mcp","https://circleci.com","CI/CD pipelines|Docker builds|Test automation","Fast builds|Docker support|Orbs ecosystem","Costs|CircleCI account needed","Dev teams|Docker workflows|CI/CD");

// Logging & Observability (2)
add("Splunk MCP","splunk-mcp","Data & Analytics","Splunk - log search, dashboards, alerting, SIEM","🔍","Advanced","100+","https://github.com/anthropics/splunk-mcp","https://splunk.com","Log analysis|Security monitoring|Dashboards|SIEM","Powerful search|Enterprise SIEM|Rich dashboards","Costs|Complex SPL queries|Heavy setup","Security teams|SRE|Enterprise IT");
add("New Relic MCP","newrelic-mcp","Data & Analytics","New Relic observability - APM, infrastructure, logs, synthetics","💜","Intermediate","100+","https://github.com/anthropics/newrelic-mcp","https://newrelic.com","APM|Infrastructure monitoring|Log analysis","Full-stack observability|Free tier|NRQL","Learning curve|Costs at scale","DevOps|SRE|Platform teams");

// DNS & Networking (1)
add("Cloudflare DNS MCP","cloudflare-dns-mcp","Cloud","Cloudflare DNS management - records, zones, security settings","🌎","Beginner","50+","https://github.com/anthropics/cloudflare-dns-mcp","https://cloudflare.com","DNS management|Zone config|SSL|Security","Free DNS|Global anycast|DDoS protection","Cloudflare account needed","Web admins|DevOps|Domain management");

// Container (1)
add("Docker Compose MCP","docker-compose-mcp","DevOps","Docker Compose - multi-container apps, services, networks","🐋","Intermediate","100+","https://github.com/anthropics/docker-compose-mcp","https://docs.docker.com/compose","Multi-container apps|Dev environments|Service orchestration","Declarative|Reproducible|Local dev","Docker knowledge needed|Resource usage","Developers|DevOps|Local development");

// API Management (1)
add("Swagger MCP","swagger-mcp","Code Execution","Swagger/OpenAPI - spec generation, API documentation, testing","📑","Beginner","50+","https://github.com/anthropics/swagger-mcp","https://swagger.io","API documentation|Spec generation|API testing","Industry standard|Auto-generation|Visualization","OpenAPI knowledge helpful","API developers|Backend teams|Documentation");

// Time & Scheduling (1)
add("Cron MCP","cron-mcp","DevOps","Cron job management - schedule tasks, view logs, manage timers","⏰","Beginner","50+","https://github.com/anthropics/cron-mcp","https://crontab.guru","Scheduled tasks|Timer management|Job monitoring","Simple scheduling|Unix standard|Local control","Server access needed|Limited error handling","System administrators|DevOps|Automation");

const all = [...existing, ...more];
console.log(`Total MCP servers: ${all.length}`);
fs.writeFileSync(filePath, JSON.stringify(all, null, 2));
console.log("Done!");
