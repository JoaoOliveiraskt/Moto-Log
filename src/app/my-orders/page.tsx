import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderItem from "./components/order-item";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";

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
  return (
    <>
    <Header />
    <BottomNav />
      <div className="py-6 px-4 sm:flex sm: flex-col sm:max-w-[40rem] mx-auto mt-4 sm:mt-20">
        <h2 className="font-semibold pb-6 text-lg">Meus Pedidos</h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
