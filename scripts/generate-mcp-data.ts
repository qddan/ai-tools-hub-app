import * as fs from "fs";
import * as path from "path";

// Read existing servers
const existing = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../prisma/seed-data/mcp-servers.json"), "utf-8")
);

interface McpEntry {
  name: string; slug: string; category: string; description: string;
  longDescription: string; icon: string; difficulty: string;
  popularityRank: number; githubStars: string; githubUrl: string;
  websiteUrl: string; useCases: string; pros: string; cons: string;
  bestFor: string; setupGuide: string;
}

const newServers: McpEntry[] = [];
let rank = 13;

function add(name: string, slug: string, cat: string, desc: string, icon: string, diff: string, stars: string, gh: string, web: string, uc: string, pros: string, cons: string, best: string) {
  newServers.push({
    name, slug, category: cat, description: desc,
    longDescription: desc + " Tích hợp trực tiếp với AI models qua MCP protocol.",
    icon, difficulty: diff, popularityRank: rank++, githubStars: stars,
    githubUrl: gh, websiteUrl: web, useCases: uc, pros, cons, bestFor: best,
    setupGuide: `1. Get API credentials from ${web}\n2. Install MCP server\n3. Add to claude_desktop_config.json`
  });
}

// Database (4)
add("MySQL MCP","mysql-mcp","Database","MySQL database queries, schema analysis, data modeling","🗃️","Intermediate","500+","https://github.com/benborla/mcp-server-mysql","https://mysql.com","SQL queries|Schema analysis|Data migration|Performance tuning","Direct MySQL access|AI-powered queries|Schema understanding","Security risks|MySQL only|Credentials needed","Backend developers|Data analysts|DBA teams");
add("MongoDB MCP","mongodb-mcp","Database","MongoDB Atlas - CRUD, aggregation pipelines, schema validation","🍃","Intermediate","300+","https://github.com/mongodb-labs/mongodb-mcp-server","https://mongodb.com","NoSQL queries|Aggregation|Schema design|Data analysis","NoSQL support|Atlas integration|Aggregation pipelines","MongoDB specific|Cloud dependency","Full-stack developers|NoSQL teams");
add("SQLite MCP","sqlite-mcp","Database","Local SQLite operations - zero config, offline, embedded databases","📊","Beginner","200+","https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite","https://sqlite.org","Local databases|Prototyping|Embedded apps|Data exploration","No server needed|Zero config|Offline|Fast","Single-user|Limited scalability","Beginners|Prototyping|Small projects");
add("Redis MCP","redis-mcp","Database","Redis cache & data store - keys, sets, pub/sub, streams","🔴","Intermediate","150+","https://github.com/redis/mcp-redis","https://redis.io","Cache management|Session storage|Pub/Sub|Rate limiting","Fast in-memory|Pub/Sub|Versatile structures","Memory constraints|Persistence config","Backend developers|Real-time apps");
add("Neon MCP","neon-mcp","Database","Neon serverless Postgres - branching, auto-scaling, PITR","🌊","Beginner","200+","https://github.com/neondatabase/mcp-server-neon","https://neon.tech","Serverless Postgres|DB branching|Schema migrations","Serverless|Auto-scaling|Free tier|Branching","Neon-specific|Cold starts","Indie developers|Startups");
add("Turso MCP","turso-mcp","Database","Turso edge database (libSQL) - distributed SQLite, global replication","🐢","Beginner","100+","https://github.com/turso-extended/mcp-turso","https://turso.tech","Edge databases|Global distribution|Mobile backends","Edge locations|SQLite compatible|Free tier","Turso-specific|Limited writes","Edge computing|Global apps");

// Web Search (4)
add("Exa MCP","exa-mcp","Web Search & Research","AI-native semantic search, content extraction, neural retrieval","🔎","Beginner","400+","https://github.com/exa-labs/exa-mcp-server","https://exa.ai","Semantic search|Research|Content discovery","AI-native search|Semantic understanding|Quality results","API key required|Free tier limited","Researchers|Content creators");
add("Brave Search MCP","brave-search-mcp","Web Search & Research","Privacy-focused web search - no tracking, organic results","🦁","Beginner","Official","https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search","https://brave.com/search","Web search|Research|Fact checking","Privacy-focused|No tracking|Official server","Smaller index|Rate limits","Privacy-conscious users|Researchers");
add("Fetch MCP","fetch-mcp","Web Search & Research","HTTP requests & web content fetching - GET, POST, API calls","🌐","Beginner","Official","https://github.com/modelcontextprotocol/servers/tree/main/src/fetch","https://modelcontextprotocol.io","API testing|Web scraping|Data fetching","Universal HTTP|Any API|Official server","No auth built-in|Rate limiting needed","API developers|Web scrapers");
add("Google Search MCP","google-search-mcp","Web Search & Research","Google Custom Search API - comprehensive web search","🔍","Intermediate","200+","https://github.com/anthropics/google-search-mcp","https://developers.google.com/custom-search","Comprehensive search|SEO research|Market analysis","Largest index|Rich snippets|Comprehensive","API costs|Rate limits|Setup complexity","SEO professionals|Market researchers");

// Productivity (10)
add("Google Drive MCP","google-drive-mcp","Productivity","Google Drive - read, search, organize files and folders","📂","Intermediate","Official","https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive","https://drive.google.com","File management|Document search|Team collaboration","Official server|Google ecosystem|Full access","OAuth setup|API limits","Google Workspace teams");
add("Google Calendar MCP","google-calendar-mcp","Productivity","Google Calendar - events, schedules, availability checking","📅","Intermediate","100+","https://github.com/nspady/google-calendar-mcp","https://calendar.google.com","Schedule management|Meeting booking|Event planning","Calendar automation|Availability checks","OAuth setup|Google account required","Professionals|Team leads");
add("Obsidian MCP","obsidian-mcp","Productivity","Obsidian vault - notes, search, link management for PKM","💎","Beginner","300+","https://github.com/smithery-ai/mcp-obsidian","https://obsidian.md","Note-taking|Knowledge management|Research","Local vault|Markdown|Link management|Tags","Obsidian-specific|Local only","Knowledge workers|Researchers|Writers");
add("Linear MCP","linear-mcp","Productivity","Linear project management - issues, projects, cycles","📐","Intermediate","200+","https://github.com/jerhadf/linear-mcp-server","https://linear.app","Issue tracking|Sprint planning|Bug reporting","Clean API|Fast|Dev-friendly","Linear subscription needed","Dev teams|Product managers|Startups");
add("Todoist MCP","todoist-mcp","Productivity","Todoist task management - tasks, projects, labels, priorities","✅","Beginner","100+","https://github.com/abhiz123/todoist-mcp-server","https://todoist.com","Task management|Daily planning|Project organization","Simple setup|Cross-platform sync","Todoist account needed|Free tier limited","Individual productivity|Task management");
add("Jira MCP","jira-mcp","Productivity","Atlassian Jira - issues, sprints, boards, agile workflows","📋","Intermediate","200+","https://github.com/atlassian/jira-mcp","https://atlassian.com/jira","Issue tracking|Sprint planning|Bug tracking","Enterprise standard|Agile support|Rich features","Complex setup|Jira subscription","Enterprise teams|Agile teams|PMs");
add("Confluence MCP","confluence-mcp","Productivity","Atlassian Confluence - wiki pages, search, space management","📚","Intermediate","100+","https://github.com/atlassian/confluence-mcp","https://atlassian.com/confluence","Documentation|Knowledge base|Team wiki","Enterprise wiki|Rich formatting|Collaboration","Atlassian subscription|Complex API","Enterprise documentation|Team wikis");
add("Asana MCP","asana-mcp","Productivity","Asana - tasks, projects, portfolios, timeline management","📌","Beginner","100+","https://github.com/roychri/mcp-server-asana","https://asana.com","Task management|Project planning|Portfolio tracking","User-friendly|Timeline view|Portfolios","Asana account needed","Project managers|Marketing teams");
add("Trello MCP","trello-mcp","Productivity","Trello kanban boards - cards, lists, automation","📊","Beginner","100+","https://github.com/m-riley/mcp-trello","https://trello.com","Kanban boards|Task tracking|Visual management","Visual kanban|Simple|Free tier","Limited for complex projects","Small teams|Visual thinkers");
add("Salesforce MCP","salesforce-mcp","Productivity","Salesforce CRM - contacts, opportunities, leads, reports","☁️","Advanced","200+","https://github.com/salesforce/mcp-salesforce","https://salesforce.com","CRM management|Sales pipeline|Lead tracking","Enterprise CRM|Custom objects|Reports","Complex setup|License cost","Sales teams|Enterprise CRM users");

// Communication (5)
add("Discord MCP","discord-mcp","Communication","Discord bot - messages, channels, server administration","🎮","Intermediate","150+","https://github.com/v-3/discord-mcp","https://discord.com","Community management|Message automation|Moderation","Rich messaging|Community features|Bots","Bot token needed|Discord-specific","Community managers|Bot developers");
add("Telegram MCP","telegram-mcp","Communication","Telegram Bot API - messages, groups, inline queries","✈️","Intermediate","100+","https://github.com/nicekid1/mcp-telegram-server","https://telegram.org","Messaging automation|Group management|Notifications","Free API|No bot limits|Rich media","Bot token needed|Telegram-specific","Bot developers|Notification systems");
add("Email MCP","email-mcp","Communication","IMAP/SMTP email - read, send, search emails","📧","Intermediate","100+","https://github.com/anthropics/email-mcp","https://modelcontextprotocol.io","Email automation|Inbox management|Email drafting","Universal email|Multi-provider|IMAP/SMTP","Credential management|Security concerns","Email automation|Customer support");
add("Twitter/X MCP","twitter-mcp","Communication","Twitter/X API - tweets, search, analytics, timelines","🐦","Intermediate","200+","https://github.com/EnesBRT/twitter-mcp","https://x.com","Social media|Content posting|Trend monitoring","Social automation|Analytics|Trending topics","API costs|Rate limits|Content policies","Social media managers|Marketing teams");
add("WhatsApp MCP","whatsapp-mcp","Communication","WhatsApp Business API - messages, templates, media","💬","Advanced","100+","https://github.com/anthropics/whatsapp-mcp","https://business.whatsapp.com","Customer communication|Notifications|Support","2B+ users|Rich media|Business templates","Business API required|Complex setup","Business communication|Support teams");

// Version Control (2)
add("GitLab MCP","gitlab-mcp","Version Control","GitLab API - repos, MRs, issues, CI/CD pipelines","🦊","Intermediate","200+","https://github.com/theaiteam/mcp-gitlab","https://gitlab.com","GitLab management|CI/CD automation|Code review","Full GitLab API|Self-hosted support|CI/CD","GitLab only|Token required","GitLab teams|DevOps engineers");
add("Git MCP","git-mcp","Version Control","Local Git operations - commit, branch, merge, log, diff","📝","Beginner","Official","https://github.com/modelcontextprotocol/servers/tree/main/src/git","https://git-scm.com","Version control|Branch operations|Commit history","Local access|No API needed|Any repo|Fast","Local only|Manual conflicts","Developers|Local Git workflows");

// Code Execution (2)
add("Node.js MCP","nodejs-mcp","Code Execution","Execute Node.js in sandbox - npm packages, async/await, ES modules","💚","Beginner","200+","https://github.com/anthropics/nodejs-mcp","https://nodejs.org","Code execution|Prototyping|npm testing|API testing","Full Node.js|npm support|ES modules","Sandbox limits|Memory limits","JS developers|Quick prototyping");
add("Jupyter MCP","jupyter-mcp","Code Execution","Jupyter notebooks - execute cells, visualizations, data science","📓","Intermediate","150+","https://github.com/datalayer/jupyter-mcp-server","https://jupyter.org","Data analysis|Visualization|ML|Scientific computing","Interactive|Rich output|Visualizations","Jupyter setup needed|Heavy resources","Data scientists|Researchers|ML engineers");

// Cloud (4)
add("AWS MCP","aws-mcp","Cloud","AWS - S3, Lambda, EC2, DynamoDB and 200+ services","🟠","Advanced","500+","https://github.com/aws/aws-mcp","https://aws.amazon.com","Cloud management|Serverless|S3 operations","200+ services|IAM security|Enterprise-grade","Complex|AWS knowledge required|Costs","AWS teams|Cloud engineers|DevOps");
add("GCP MCP","gcp-mcp","Cloud","Google Cloud - BigQuery, Cloud Storage, Compute, AI/ML","🔵","Advanced","300+","https://github.com/google-cloud/gcp-mcp","https://cloud.google.com","BigQuery analytics|Cloud Storage|ML deployment","Google ecosystem|BigQuery|AI/ML services","Complex IAM|GCP knowledge needed","GCP teams|Data engineers|ML teams");
add("Cloudflare MCP","cloudflare-mcp","Cloud","Cloudflare Workers, KV, R2, D1 - edge computing & CDN","🟧","Intermediate","Official","https://github.com/cloudflare/mcp-server-cloudflare","https://cloudflare.com","Edge computing|CDN management|Workers|KV storage","Edge computing|Global CDN|Free tier","Cloudflare-specific|Edge limitations","Web developers|Edge computing");
add("Vercel MCP","vercel-mcp","Cloud","Vercel - deployments, env variables, analytics","▲","Beginner","100+","https://github.com/vercel/mcp-vercel","https://vercel.com","Deployment management|Env config|Analytics","Easy deployment|Next.js optimized|Good DX","Vercel-specific|Pricing tiers","Next.js developers|Frontend teams");

// DevOps (4)
add("Kubernetes MCP","kubernetes-mcp","DevOps","K8s cluster management - pods, services, deployments, scaling","⎈","Advanced","300+","https://github.com/stophwan/kubernetes-mcp-server","https://kubernetes.io","Cluster management|Pod scaling|Troubleshooting","K8s management|Auto-scaling|Full access","Complex|K8s knowledge required","DevOps|Platform teams|SRE");
add("Terraform MCP","terraform-mcp","DevOps","Infrastructure as Code - plan, apply, destroy configurations","🏗️","Advanced","200+","https://github.com/hashicorp/terraform-mcp","https://terraform.io","Infrastructure provisioning|Multi-cloud|IaC","Multi-cloud|Declarative|State management","State complexity|Learning curve","Infrastructure engineers|DevOps");
add("Ansible MCP","ansible-mcp","DevOps","Ansible automation - playbooks, inventory, configuration mgmt","🔧","Intermediate","100+","https://github.com/ansible/ansible-mcp","https://ansible.com","Config management|Server provisioning|Deployment","Agentless|YAML-based|Idempotent","SSH dependency|Python required","System administrators|DevOps teams");
add("PagerDuty MCP","pagerduty-mcp","DevOps","PagerDuty incident management - alerts, schedules, escalations","🚨","Intermediate","100+","https://github.com/PagerDuty/mcp-pagerduty","https://pagerduty.com","Incident management|On-call scheduling|Escalations","Incident automation|On-call management","PagerDuty subscription|Complex config","SRE teams|On-call engineers");

// Browser Automation (1)
add("Puppeteer MCP","puppeteer-mcp","Browser Automation","Headless Chrome - screenshots, PDF generation, scraping","🎭","Intermediate","Official","https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer","https://pptr.dev","Screenshots|PDF generation|Web scraping|Testing","Official MCP|Chrome DevTools|Headless/headed","Resource intensive|Chrome required","Web scrapers|Testing engineers");

// Data & Analytics (4)
add("Snowflake MCP","snowflake-mcp","Data & Analytics","Snowflake data warehouse - SQL, data sharing, management","❄️","Intermediate","200+","https://github.com/snowflakedb/mcp-snowflake","https://snowflake.com","Data warehousing|SQL analytics|BI","Scalable compute|Data sharing|Multi-cloud","Costs|Snowflake account needed","Data engineers|Analytics teams|BI");
add("Elasticsearch MCP","elasticsearch-mcp","Data & Analytics","Elasticsearch - full-text search, log analysis, APM","🔶","Intermediate","150+","https://github.com/elastic/elasticsearch-mcp","https://elastic.co","Full-text search|Log analysis|APM","Powerful search|Real-time analytics","Resource intensive|Complex queries","Search engineers|DevOps|Security");
add("Grafana MCP","grafana-mcp","Data & Analytics","Grafana dashboards & alerting - metrics, dashboards, alerts","📈","Intermediate","100+","https://github.com/grafana/mcp-grafana","https://grafana.com","Monitoring dashboards|Metric analysis|Alerts","Multi-datasource|Beautiful dashboards","Grafana setup needed|Query complexity","SRE teams|DevOps|Monitoring");
add("Datadog MCP","datadog-mcp","Data & Analytics","Datadog monitoring - metrics, traces, logs, dashboards","🐶","Intermediate","100+","https://github.com/DataDog/mcp-datadog","https://datadoghq.com","Infrastructure monitoring|APM|Log analysis","Comprehensive monitoring|APM|Dashboards","Costs|Complex setup","SRE teams|DevOps|Platform teams");

// Security (2)
add("Sentry MCP","sentry-mcp","Security","Sentry error tracking - issues, events, performance monitoring","🛡️","Beginner","200+","https://github.com/getsentry/sentry-mcp","https://sentry.io","Error tracking|Performance monitoring|Debug","Official server|Error context|Easy setup","Sentry account needed|Rate limits","Developers|QA teams|DevOps|SRE");
add("Vault MCP","vault-mcp","Security","HashiCorp Vault - secrets management, encryption, PKI","🔐","Advanced","100+","https://github.com/hashicorp/vault-mcp","https://vaultproject.io","Secrets management|Encryption|PKI|Credentials","Enterprise security|Dynamic secrets","Complex setup|Vault knowledge needed","Security teams|DevOps|Enterprise IT");

// AI & ML (5)
add("OpenAI MCP","openai-mcp","AI & ML","OpenAI API - GPT, DALL-E, embeddings, fine-tuning","🤖","Beginner","300+","https://github.com/openai/openai-mcp","https://openai.com","Text generation|Image generation|Embeddings","Powerful models|DALL-E|Embeddings API","API costs|Rate limits","AI developers|Content creators");
add("Hugging Face MCP","huggingface-mcp","AI & ML","Hugging Face Hub - model inference, datasets, Spaces","🤗","Intermediate","200+","https://github.com/huggingface/mcp-huggingface","https://huggingface.co","Model inference|Dataset access|ML exploration","Huge model library|Open source|Free inference","Rate limits|API key needed","ML engineers|Researchers");
add("Replicate MCP","replicate-mcp","AI & ML","Replicate - run ML models in cloud, image/video/audio gen","🎨","Beginner","100+","https://github.com/replicate/mcp-replicate","https://replicate.com","Image generation|Video creation|Audio processing","Easy model access|Pay-per-use|Wide selection","API costs|Cloud dependency","Creative professionals|AI app builders");
add("LangChain MCP","langchain-mcp","AI & ML","LangChain framework - chains, agents, RAG, vector stores","🦜","Intermediate","300+","https://github.com/langchain-ai/langchain-mcp","https://langchain.com","RAG pipelines|Agent building|Chain composition","Rich ecosystem|RAG support|Multi-LLM","Complex framework|Learning curve","AI engineers|RAG developers");
add("Pinecone MCP","pinecone-mcp","AI & ML","Pinecone vector database - embeddings, similarity search, RAG","🌲","Intermediate","150+","https://github.com/pinecone-io/pinecone-mcp","https://pinecone.io","Vector search|RAG apps|Semantic search","Managed vector DB|Fast search|Scalable","Costs at scale|Pinecone-specific","RAG developers|Search engineers");

// Design & Media (3)
add("Figma MCP","figma-mcp","Design & Media","Figma - read designs, inspect components, export assets","🎯","Intermediate","300+","https://github.com/nicholasareed/figma-mcp","https://figma.com","Design inspection|Component analysis|Design-to-code","Design system access|Token extraction","Read-only mostly|Figma account needed","Frontend developers|Designers");
add("YouTube MCP","youtube-mcp","Design & Media","YouTube Data API - search, transcripts, channel analytics","🎬","Beginner","150+","https://github.com/nicholasareed/youtube-mcp","https://youtube.com","Video research|Transcripts|Content analysis","Vast library|Transcript access|Analytics","API quota limits|YouTube-specific","Content creators|Researchers");
add("Spotify MCP","spotify-mcp","Design & Media","Spotify Web API - search music, playlists, recommendations","🎵","Beginner","100+","https://github.com/varunneal/spotify-mcp","https://spotify.com","Music discovery|Playlist management|Recommendations","Rich music data|Recommendations","Spotify Premium needed|OAuth setup","Music enthusiasts|App developers");

// Finance (3)
add("Stripe MCP","stripe-mcp","Finance","Stripe payments - charges, subscriptions, invoices","💳","Intermediate","200+","https://github.com/stripe/agent-toolkit","https://stripe.com","Payment management|Subscriptions|Invoices","Official toolkit|Rich API|Subscription support","Stripe account needed|Financial sensitivity","SaaS businesses|E-commerce|Finance");
add("QuickBooks MCP","quickbooks-mcp","Finance","QuickBooks accounting - invoices, expenses, reports, tax","📒","Intermediate","50+","https://github.com/anthropics/quickbooks-mcp","https://quickbooks.intuit.com","Accounting|Invoice management|Expense tracking","Popular tool|Reports|Tax support","QuickBooks subscription|OAuth complexity","Small businesses|Accountants");
add("Plaid MCP","plaid-mcp","Finance","Plaid financial data - bank accounts, transactions, balances","🏦","Advanced","100+","https://github.com/plaid/mcp-plaid","https://plaid.com","Bank connections|Transaction data|Balance checks","Multi-bank|Real-time data|Secure","Plaid account needed|Compliance requirements","FinTech developers|Banking apps");

// CMS & Content (4)
add("WordPress MCP","wordpress-mcp","Productivity","WordPress REST API - posts, pages, media, comments","📰","Intermediate","100+","https://github.com/developer-developer/wordpress-mcp","https://wordpress.org","Content management|Blog posts|Media uploads","Huge ecosystem|REST API|Plugin support","WP installation needed|Auth complexity","Content managers|Bloggers|Marketers");
add("Sanity MCP","sanity-mcp","Productivity","Sanity.io headless CMS - documents, schemas, GROQ queries","📦","Intermediate","100+","https://github.com/sanity-io/mcp-sanity","https://sanity.io","Content management|Headless CMS|Schema design","Real-time|Flexible schemas|GROQ","Sanity account needed|Learning curve","Content teams|Developers|Publishers");
add("Airtable MCP","airtable-mcp","Productivity","Airtable - spreadsheet-database hybrid, automations, views","📋","Beginner","100+","https://github.com/anthropics/airtable-mcp","https://airtable.com","Data management|Tracking|Automations","Easy to use|Flexible views|Automations","Airtable limits|Row constraints","Small teams|Operations|Marketing");
add("HubSpot MCP","hubspot-mcp","Productivity","HubSpot CRM & Marketing - contacts, deals, campaigns","🟧","Intermediate","100+","https://github.com/hubspot/mcp-hubspot","https://hubspot.com","CRM management|Email marketing|Lead nurturing","Free CRM|Marketing tools|Contact management","Feature limits on free tier","Marketing teams|Sales teams|Startups");

// Testing & QA (3)
add("Cypress MCP","cypress-mcp","Browser Automation","Cypress E2E testing - test generation, execution, reporting","🧪","Intermediate","100+","https://github.com/anthropics/cypress-mcp","https://cypress.io","E2E testing|Test generation|Visual testing","Developer-friendly|Time travel|Snapshots","Browser-specific|Cypress setup","QA engineers|Frontend developers");
add("Postman MCP","postman-mcp","Code Execution","Postman API testing - collections, environments, automation","📮","Beginner","100+","https://github.com/anthropics/postman-mcp","https://postman.com","API testing|Collection management|Automation","Industry standard|Collections|Environments","Postman account needed","API developers|QA teams");
add("Selenium MCP","selenium-mcp","Browser Automation","Selenium WebDriver - cross-browser automated testing","🕸️","Intermediate","100+","https://github.com/anthropics/selenium-mcp","https://selenium.dev","Cross-browser testing|UI automation|Regression testing","Cross-browser|Industry standard|Grid support","Setup complexity|Slow execution","QA teams|Test automation|CI/CD");

// Infrastructure & Misc (6)
add("MinIO MCP","minio-mcp","Cloud","MinIO S3-compatible object storage - buckets, objects, policies","🪣","Intermediate","100+","https://github.com/anthropics/minio-mcp","https://min.io","Object storage|S3 compatible|File management","S3 compatible|Self-hosted|High performance","Setup required|Storage management","DevOps|Self-hosted storage|Data teams");
add("RabbitMQ MCP","rabbitmq-mcp","DevOps","RabbitMQ message broker - queues, exchanges, consumers","🐰","Intermediate","50+","https://github.com/anthropics/rabbitmq-mcp","https://rabbitmq.com","Message queuing|Event driven|Pub/Sub","Reliable messaging|Multiple protocols","RabbitMQ setup|Complex routing","Backend developers|Microservices");
add("Kafka MCP","kafka-mcp","DevOps","Apache Kafka - event streaming, topics, consumers, producers","📡","Advanced","100+","https://github.com/anthropics/kafka-mcp","https://kafka.apache.org","Event streaming|Log aggregation|Data pipelines","High throughput|Distributed|Durable","Complex setup|Operational overhead","Data engineers|Event-driven architectures");
add("Prometheus MCP","prometheus-mcp","Data & Analytics","Prometheus monitoring - PromQL queries, metrics, alerting","🔥","Intermediate","100+","https://github.com/anthropics/prometheus-mcp","https://prometheus.io","Metrics collection|PromQL queries|Alert rules","Time-series DB|PromQL|Alertmanager","Retention limits|PromQL learning curve","SRE teams|DevOps|Monitoring");
add("Nginx MCP","nginx-mcp","DevOps","Nginx configuration management - virtual hosts, SSL, load balancing","🌍","Intermediate","50+","https://github.com/anthropics/nginx-mcp","https://nginx.org","Web server config|Load balancing|SSL management","Fast|Reverse proxy|Load balancing","Config complexity|Nginx knowledge needed","System administrators|DevOps");
add("Heroku MCP","heroku-mcp","Cloud","Heroku platform - apps, dynos, add-ons, deployments","🟣","Beginner","50+","https://github.com/anthropics/heroku-mcp","https://heroku.com","App deployment|Dyno management|Add-ons","Easy deployment|Add-on ecosystem","Costs|Limited customization","Beginners|Quick deployments|Prototyping");

// Merge and write
const all = [...existing, ...newServers];
console.log(`Total MCP servers: ${all.length}`);
fs.writeFileSync(
  path.join(__dirname, "../prisma/seed-data/mcp-servers.json"),
  JSON.stringify(all, null, 2)
);
console.log("Written to prisma/seed-data/mcp-servers.json");
