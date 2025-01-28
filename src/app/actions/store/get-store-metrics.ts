import { db } from "@/lib/prisma";
import type { Decimal } from "prisma/generated/client/runtime/library";

type OrderMetrics = {
  totalPrice: Decimal;
  products: {
    quantity: number;
  }[];
};

type StoreMetrics = {
  receitaTotal: number;
  totalVendas: number;
};

export default async function getStoreMetrics(
  storeId: string
): Promise<StoreMetrics> {
  try {
    const metrics: OrderMetrics[] = await db.order.findMany({
      where: {
        lojaId: storeId,
      },
      select: {
        totalPrice: true,
        products: {
          select: {
            quantity: true,
          },
        },
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const somaReceitaTotal = Number(
      metrics
        .reduce(
          (acc, order) => acc + parseFloat(order.totalPrice.toString()),
          0
        )
        .toFixed(2)
    );

    const receitaTotal = Number(somaReceitaTotal.toFixed(2));

    const totalVendas = metrics.reduce(
      (acc, order) =>
        acc +
        order.products.reduce((acc, product) => acc + product.quantity, 0),
      0
    );

    return { receitaTotal, totalVendas };
  } catch (error) {
    throw new Error("Failed to fetch metrics");
  }
}
