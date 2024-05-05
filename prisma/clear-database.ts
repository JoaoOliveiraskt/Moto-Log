import  { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete all existing data
    await prisma.produto.deleteMany({});
  } catch (error) {
    console.error("Error clearing data:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

main();