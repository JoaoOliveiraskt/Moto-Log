import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getUserStore() {
  const session = await getServerSession(authOptions);
  try {
    const storeData = await db.loja.findFirst({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        imagemUrl: true,
        createdAt: true,
        slug: true,
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
}
