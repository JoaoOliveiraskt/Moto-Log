import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrderItem from "./components/order-item";
import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import TypographyH1 from "@/components/typography/typography-h1";

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
      <Container className="min-h-[calc(100vh-3.5rem)] space-y-6 mt-12 lg:mt-14 lg:pt-2">
        <GoBackButton containerClassName="hidden lg:flex" />

        {orders.length > 0 ? (
          <div className="gap-5 grid grid-cols-1  max-w-screen-sm mx-auto w-full">
            {[...orders].reverse().map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className=" pt-6 lg:pt-0">
            <div>
              <TypographyH1 className="font-semibold ">
                Você ainda não fez nenhum pedido.
              </TypographyH1>

              <p className="text-muted-foreground mt-2">
                Continue comprando e faça seu primeiro pedido.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <Button asChild className="w-fit">
                  <Link href="/">Ir às compras</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default MyOrdersPage;
