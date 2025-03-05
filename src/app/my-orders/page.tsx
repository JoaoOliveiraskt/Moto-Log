import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrderItem from "./components/order-item";
import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import EmptyOrder from "./components/empty-order";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      loja: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders || orders.length === 0) {
    return <EmptyOrder />;
  }

  return (
    <Container className="min-h-[calc(100vh-3.5rem)] space-y-6 pt-12 lg:pt-14">
      <GoBackButton containerClassName="hidden lg:flex" />

      <div className="gap-5 grid grid-cols-1  max-w-screen-sm mx-auto w-full">
        {[...orders].reverse().map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </Container>
  );
};

export default MyOrdersPage;
