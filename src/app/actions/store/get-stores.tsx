import { db } from "@/lib/prisma";

export default async function GetStores({ limit }: { limit?: number }) {
  const stores = await db.loja.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: limit,
  });

  return stores;
}
