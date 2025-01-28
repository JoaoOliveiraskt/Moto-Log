import formatCurrency from "@/app/helpers/format-currency";
import { db } from "@/lib/prisma";

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
    throw new Error("Failed to fetch recent users");
  }
}
