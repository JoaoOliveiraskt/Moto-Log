import { db } from "@/lib/prisma";

export async function getStoreProducts(storeId: string) {
  try {
    const products = await db.produto.findMany({
      where: {
        lojaId: storeId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        imagemUrl: true,
        estoque: true,
        preco: true,
        porcentagemDesconto: true,
        status: true,
        createdAt: true,
        totalVendido: true,
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
