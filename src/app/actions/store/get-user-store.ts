import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getUserStore() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("User not authenticated");
  }

  try {
    const storeData = await db.loja.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        nome: true,
        descricao: true,
        profileImageUrl: true,
        bannerImageUrl: true,
        createdAt: true,
        slug: true,
        email: true,
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
    throw new Error("Failed to fetch store");
  }
}
