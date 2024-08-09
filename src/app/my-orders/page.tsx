import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderItem from "./components/order-item";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";
import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";

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
      <Container className="flex flex-col gap-8  mt-8 lg:mt-20">
        <GoBackButton name={"Meus pedidos"} />

        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
