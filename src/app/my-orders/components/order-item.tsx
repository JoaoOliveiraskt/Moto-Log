import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="cursor-pointer bg-background hover:border-accent flex flex-col gap-2">
      <CardContent className="p-2.5 flex flex-col gap-2">
        <div
          className={`w-fit px-1.5 py-0 text-popover rounded-full ${
            order.status !== "COMPLETED" ? "bg-card-foreground " : "bg-emerald-700" 
          }`}
        >
          <span className="block text-sm font-bold tracking-tight">
            {getOrderStatus(order.status)}
          </span>
        </div>

          <Button variant={"outline"} size={"icon"} className="w-full border border-border flex justify-between items-center px-2">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={order.loja.imagemUrl} />
            </Avatar>
            <span>{order.loja.nome}</span>
          </div>
        <Link href={`/store/${order.lojaId}`} >
            <HiMiniChevronRight size={24} />
        </Link>
          </Button>

        <div className="">
          <Separator />
        </div>

        <ScrollArea className="h-16">
          {order.products.map((product) => (
            <div key={product.id} className="flex space-x-2 mt-1.5">
              <div className="flex flex-col items-center justify-center w-5 h-5 rounded-full bg-muted-foreground">
                <span className="block text-xs font-bold text-primary-foreground">
                  {product.quantity}
                </span>
              </div>
              <span className="text-muted-foreground text-sm font-medium">
                {product.product.nome}
              </span>
            </div>
          ))}
        </ScrollArea>

        <div className="">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium tracking-wider">{formatCurrency(Number(order.totalPrice))}</p>
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
