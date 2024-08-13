import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatus, Prisma } from "prisma/generated/client";
import { HiMiniChevronRight } from "react-icons/hi2";
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
  return (
    <Card className="cursor-pointer flex flex-col gap-2 bg-card/5 hover:bg-card/10 transition-all">
      <CardContent className="p-3 flex flex-col gap-3">
        <CardHeader className="px-1">
          <div className="flex gap-4 items-center justify-between">
            <div
              className={`${
                order.status !== "COMPLETED"
                  ? "text-muted-foreground"
                  : "text-emerald-500"
              }`}
            >
              <span className="block text-sm font-semibold tracking-wider">
                {getOrderStatus(order.status)}
              </span>
            </div>

            <Link
              href={`/store/${order.lojaId}`}
              className="flex gap-2 items-center mt-1 text-muted-foreground 
              hover:text-cyan-600 dark:hover:text-cyan-600 w-fit"
            >
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={order.loja.imagemUrl} />
                </Avatar>
                <span className="">{order.loja.nome}</span>
              </div>
              <HiMiniChevronRight />
            </Link>
          </div>

          <p className="text-muted-foreground text-lg font-semibold tracking-wider">
            {formatCurrency(Number(order.totalPrice))}
          </p>
        </CardHeader>

        <Separator />

        <ScrollArea className="max-h-28">
          {order.products.map((product) => (
            <div key={product.id} className="flex space-x-2 mb-2">
              <div className="flex flex-col items-center justify-center w-5 h-5 rounded-full border">
                <span className="block text-xs font-bold text-foreground">
                  {product.quantity}
                </span>
              </div>
              <span className="text-muted-foreground text-sm font-medium">
                {product.product.nome}
              </span>
            </div>
          ))}
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
