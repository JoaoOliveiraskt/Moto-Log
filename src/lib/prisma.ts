/* eslint-disable no-unused-vars */
import { PrismaClient } from "../../prisma/generated/client";

// Defining global variable type
declare var global: {
  cachedPrisma?: PrismaClient;
} & typeof globalThis;

let prisma: PrismaClient;
if (process.env.DATABASE_URL === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma as PrismaClient;
}

export const db = prisma;
