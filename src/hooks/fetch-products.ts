import { PrismaClient, Produto } from "../../prisma/generated/client";

const prisma = new PrismaClient();

const FetchProducts = async (): Promise<Produto[]> => {
  try {
    const products: Produto[] = await prisma.produto.findMany({
      include: {
        loja: {
          select: {
            nome: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default FetchProducts;
