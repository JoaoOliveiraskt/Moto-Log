"use client";

import { CartContext } from "@/app/context/cart";
import { useContext, useState } from "react";
import CartItem from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import formatCurrency from "@/app/helpers/format-currency";
import { CreateOrder } from "../actions/order/order";
import { OrderStatus } from "prisma/generated/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/icons/icon-component";
import Loader from "@/components/ui/loader";
import { updateProductSales } from "@/app/actions/product/update-product-sales";
import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import Link from "next/link";
import EmptyCart from "./components/empty-cart";

const Cart = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data } = useSession();
  const { products, subTotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);
  const totalProductQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const loja = products?.[0].loja;
    try {
      setIsSubmitLoading(true);
      await CreateOrder({
        subTotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFee: loja.deliveryFee,
        deliveryTime: loja.deliveryTime,
        loja: {
          connect: { id: loja.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      await updateProductSales(products);

      clearCart();

      toast({
        duration: 5000,
        // @ts-ignore
        title: (
          <div className="flex items-center gap-x-2">
            <Icon.confirmed color="green" />
            <span>Pedido finalizado com sucesso!</span>
          </div>
        ),
        description:
          "Você pode acompanhar o status do seu pedido na aba 'Meus Pedidos'",
        action: (
          <ToastAction altText="Ver pedido">
            <Link legacyBehavior href="/my-orders">
              <a>Meus pedidos</a>
            </Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: "Erro ao finalizar pedido",
        description: "Não foi possível processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
      throw new Error("Erro ao finalizar pedido");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  if (!products || products.length === 0) {
    return <EmptyCart user={data?.user} />;
  }

  return (
    <>
      <Container className="h-screen pt-10 lg:pt-14 space-y-6">
        <GoBackButton containerClassName="hidden lg:flex" />

        <div className="grid lg:grid-cols-5 md:gap-x-4 h-full w-full">
          <div className="col-span-2 lg:col-span-3">
            <ScrollArea className="h-[calc(100vh-19.3rem)] lg:h-[42rem]">
              {products.map((product) => (
                <div key={product.id} className="mb-4 lg:mr-6">
                  <CartItem cartProduct={product} />
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="w-full col-span-2 px-4 lg:col-span-2 fixed bottom-4 left-0 right-0 z-10 lg:static lg:bottom-auto lg:z-auto">
            <Card className="border-none mt-4 h-max w-full">
              <CardContent className="p-6 border-none space-y-5 w-full">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(Number(subTotalPrice))}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Descontos</span>
                  <span className="text-confirmed">
                    - {formatCurrency(Number(totalDiscount))}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(Number(totalPrice))}</span>
                </div>
                <Button
                  size={"rounded"}
                  onClick={() => setIsConfirmDialogOpen(true)}
                  className="h-12 w-full mt-4 mb-4 font-semibold flex items-center gap-2"
                  disabled={isSubmitLoading}
                >
                  <span>Fazer pedido ({totalProductQuantity})</span>
                  {isSubmitLoading && <Loader />}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja Finalizar seu pedido ?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da loja.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
