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
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <Container className="flex flex-col gap-8 mt-8 lg:mt-16">
        
        <GoBackButton name={"Meus pedidos"} />

        {orders.length > 0 ? (
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
            {[...orders].reverse().map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 my-16 sm:my-32 items-center justify-center">
            <h2 className="text-center font-bold">
              Você ainda não fez nenhum pedido.
            </h2>
            <Link href="/">
              <Button>Ir às compras</Button>
            </Link>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
