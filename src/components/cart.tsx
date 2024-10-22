"use client";

import { CartContext } from "@/app/context/cart";
import { useContext, useState } from "react";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import formatCurrency from "@/app/helpers/format-currency";
import { Separator } from "./ui/separator";
import { CreateOrder } from "@/app/actions/order";
import { OrderStatus } from "../../prisma/generated/client";
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
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import Icon from "./icons/icon-component";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Loader from "./ui/loader";

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ isOpen, setIsOpen }: CartProps) => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data } = useSession();
  const { products, subTotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    setIsOpen(true);
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

      clearCart();

      toast({
        className: "",
        title: "Pedido finalizado com sucesso!",
        description:
          "Você pode acompanhar o status do seu pedido na aba 'Meus Pedidos'",
        action: (
          <ToastAction
            altText="Ver pedido"
            onClick={() => router.push("/my-orders")}
          >
            Meus pedidos
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
            <Separator />
          </SheetHeader>
          <div className="flex flex-col h-full py-5 ">
            {products.length > 0 ? (
              <div className="flex flex-col h-full justify-between">
                <ScrollArea className="h-full">
                  {products.map((product) => (
                    <>
                      <CartItem key={product.id} cartProduct={product} />
                      <Separator className="my-3" />
                    </>
                  ))}
                </ScrollArea>

                <div className="mt-6">
                  <Card className="border-none">
                    <CardContent className="p-5 border-none space-y-5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Entrega</span>
                        <span className="text-confirmed uppercase">Grátis</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-muted-foreground">
                          {formatCurrency(Number(subTotalPrice))}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Descontos</span>
                        <span className="text-muted-foreground">
                          - {formatCurrency(Number(totalDiscount))}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(Number(totalPrice))}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  size={"rounded"}
                  onClick={() => setIsConfirmDialogOpen(true)}
                  className="w-1/2 mx-auto mt-6 mb-4 font-semibold flex items-center gap-2"
                  disabled={isSubmitLoading}
                >
                  <span>Fazer pedido</span>
                  {isSubmitLoading && <Loader />}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center h-2/3">
                <Icon.cart size={80} className="text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Seu carrinho está vazio
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

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
