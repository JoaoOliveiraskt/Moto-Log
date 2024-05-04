// hooks/fetch-products.js

import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient();

const FetchProducts = async () => {
  try {
    const products = await prisma.produto.findMany({
      include: {
        loja: true 
      }
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default FetchProducts;
