import formatCurrency from "@/app/helpers/format-currency";
import { CACHE_TAGS } from "@/lib/cache-constants";
import { db } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

function formatMonthName(date: string) {
  return (
    new Intl.DateTimeFormat("pt-BR", { month: "long" })
      .format(new Date(date))
      .charAt(0)
      .toUpperCase() +
    new Intl.DateTimeFormat("pt-BR", { month: "long" })
      .format(new Date(date))
      .slice(1)
  );
}

export default async function getMonthlyRevenue(
  storeId: string
): Promise<{ month: string; totalIncome: number; formattedIncome: string }[]> {
  return unstable_cache(
    async (storeId: string) => {
      try {
        const monthlyRevenue = await db.order.groupBy({
          by: ["createdAt"],
          where: {
            lojaId: storeId,
          },
          _sum: {
            totalPrice: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        const revenueByMonth = monthlyRevenue.reduce((acc, entry) => {
          const monthKey = entry.createdAt.toISOString().slice(0, 7);

          if (!acc[monthKey]) {
            acc[monthKey] = 0;
          }

          acc[monthKey] += Number(entry._sum.totalPrice) || 0;

          return acc;
        }, {} as Record<string, number>);

        return Object.entries(revenueByMonth).map(([month, totalIncome]) => ({
          month: formatMonthName(month),
          totalIncome,
          formattedIncome: formatCurrency(totalIncome),
        }));
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
        throw new Error("Failed to fetch monthly revenue");
      }
    },
    [`monthly-revenue-${storeId}`],
    {
      tags: [CACHE_TAGS.revenue],
      revalidate: 120,
    }
  )(storeId);
}
