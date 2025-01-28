import formatCurrency from "@/app/helpers/format-currency";
import { CACHE_TAGS } from "@/lib/cache-constants";
import { db } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type RecentUser = {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  totalPrice: string;
};

export default async function getRecentUsers(
  storeId: string
): Promise<RecentUser[]> {
  return unstable_cache(
    async (storeId: string) => {
      try {
        const recentOrders = await db.order.findMany({
          where: {
            lojaId: storeId,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 6,
          select: {
            totalPrice: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        });

        const recentUsers = recentOrders.map((order) => ({
          userId: order.user.id,
          name: order.user.name,
          email: order.user.email,
          image: order.user.image,
          totalPrice: formatCurrency(Number(order.totalPrice)),
        }));

        return recentUsers;
      } catch (error) {
        console.error("Error fetching recent users:", error);
        throw new Error("Failed to fetch recent users");
      }
    },
    [`recent-users-${storeId}`],
    {
      tags: [CACHE_TAGS.users],
      revalidate: 120,
    }
  )(storeId);
}
