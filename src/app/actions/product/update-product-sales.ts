"use server";

import { db } from "src/lib/prisma";

export const updateProductSales = async (products: any[]) => {
  try {
    const updateOperations = products.map((product) => ({
      where: { id: product.id },
      data: {
        totalVendido: {
          increment: product.quantity,
        },
        estoque: {
          decrement: product.quantity,
        },
      },
    }));

    for (const operation of updateOperations) {
      await db.produto.update(operation);
    }
  } catch (error) {
    console.error("Product update error:", error);
    throw error;
  }
};
