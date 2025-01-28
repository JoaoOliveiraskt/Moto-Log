import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-constants";

export async function getUserStore() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("User not authenticated");
  }

  return unstable_cache(  
    async (userId: string) => {
      try {
        const storeData = await db.loja.findFirst({
          where: { userId },
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            nome: true,
            descricao: true,
            imagemUrl: true,
            createdAt: true,
            slug: true,
            _count: {
              select: {
                pedidos: true,
                followers: true,
              },
            },
          },
        });

        if (!storeData) {
          throw new Error("Store not found");
        }

        return storeData;
      } catch (error) {
        console.error("Error fetching store:", error);
        throw new Error("Failed to fetch store");
      }
    },
    [`user-store`],
    {
      tags: [CACHE_TAGS.store],
      revalidate: 3600,
    }
  )(session?.user.id as string);
}
