import { PrismaClient } from "@prisma/client";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

// On Vercel, the filesystem is read-only except /tmp.
// Copy the bundled SQLite database to /tmp so Prisma can open it.
// This runs at both build time and runtime on Vercel.
if (process.env.VERCEL) {
  const src = join(process.cwd(), "prisma", "dev.db");
  const dest = "/tmp/dev.db";
  if (existsSync(src)) {
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
    }
    process.env.DATABASE_URL = `file:${dest}`;
  }
} else if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
