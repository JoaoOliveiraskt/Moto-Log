import { db } from "@/lib/prisma";

export async function getStoreProducts(
  storeId: string,
  page = 1,
  pageSize = 10,
  status?: string
) {
  try {
    const whereClause: any = {
      lojaId: storeId,
    };

    if (status && status !== "all") {
      whereClause.status = status === "active" ? "ATIVO" : "ARQUIVADO";
    }

    const totalProducts = await db.produto.count({
      where: whereClause,
    });

    const products = await db.produto.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
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
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      products,
      pagination: {
        totalItems: totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
        pageSize,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
