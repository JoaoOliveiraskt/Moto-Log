import { PrismaClient, Produto } from "../../prisma/generated/client";

const prisma = new PrismaClient();

const FetchProductById = async (productId: string): Promise<Produto | null> => {
  try {
    const parsedProductId = parseInt(productId, 10);
    const product = await prisma.produto.findUnique({
      where: {
        id: parsedProductId.toString(),
      },
      include: {
        loja: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Exporte a função FetchProductById
export default FetchProductById;
