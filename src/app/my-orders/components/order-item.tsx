import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatus, Prisma } from "prisma/generated/client";
import icon from "@/components/icons/icon-component";
import { Separator } from "@/components/ui/separator";
import formatCurrency from "@/app/helpers/format-currency";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      loja: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "CONFIRMED":
      return "Confirmado";
    case "PREPARING":
      return "Preparando";
    case "DELIVERING":
      return "Em trânsito";
    case "COMPLETED":
      return "Finalizado";
    case "CANCELLED":
      return "Cancelado";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const getDiscountedPrice = (preco: number, discount?: number) => {
    if (!discount) return preco;
    return preco - preco * (discount / 100);
  };

  return (
    <Card className="cursor-pointer flex flex-col gap-2 bg-card">
      <CardContent className="p-4 flex flex-col gap-3">
        <CardHeader className="px-1 space-y-4 mb-4">
          <div className="flex gap-4 items-center justify-between">
            <div
              className={`${
                order.status !== "COMPLETED" ? "" : "text-emerald-500"
              }`}
            >
              <span className="block text-sm  font-semibold tracking-wider">
                {getOrderStatus(order.status)}
              </span>
            </div>

            <Link
              href={`/store/${order.lojaId}`}
              className="flex gap-2 items-center mt-1  text-muted-foreground
              hover:text-cyan-600 w-fit"
            >
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8 rounded-md border">
                  <AvatarImage src={order.loja.imagemUrl || undefined} />
                </Avatar>
                <span className="font-semibold">{order.loja.nome}</span>
              </div>
              <icon.arrowRight size={18} />
            </Link>
          </div>

          <p className="text-foreground text-3xl font-semibold tracking-wider">
            {formatCurrency(Number(order.totalPrice))}
          </p>
        </CardHeader>

        <ScrollArea className="max-h-28">
          {order.products.map((product) => {
            const discountedPrice = getDiscountedPrice(
              Number(product.product.preco),
              Number(product.product.porcentagemDesconto)
            );
            return (
              <Link
                key={product.id}
                href={`/product/${product.productId}`}
                className="flex justify-between mb-2 text-muted-foreground hover:text-foreground"
              >
                <div className="flex space-x-2">
                  <div className="flex flex-col items-center justify-center w-5 h-5 rounded-full border">
                    <span className="block text-xs font-bold ">
                      {product.quantity}
                    </span>
                  </div>
                  <span className="text-sm font-medium line-clamp-1">
                    {product.product.nome}
                  </span>
                </div>
                <span>
                  {discountedPrice && (
                    <span className="text-sm font-medium">
                      {formatCurrency(discountedPrice)}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </ScrollArea>

        <div className="flex items-center justify-between">
          {order.status === "COMPLETED" && (
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-destructive/70 hover:text-foreground text-sm tracking-tight"
            >
              Refazer pedido
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
