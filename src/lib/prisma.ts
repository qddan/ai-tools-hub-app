import { PrismaClient } from "@prisma/client";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

// On Vercel, the filesystem is read-only except /tmp.
// Copy the bundled SQLite database to /tmp on cold start so Prisma can open it.
if (process.env.VERCEL) {
  const src = join(process.cwd(), "prisma", "dev.db");
  const dest = "/tmp/dev.db";
  if (!existsSync(dest) && existsSync(src)) {
    copyFileSync(src, dest);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
