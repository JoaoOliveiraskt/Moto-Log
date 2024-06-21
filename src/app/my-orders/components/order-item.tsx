import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatus, Prisma } from "prisma/generated/client";
import { HiMiniChevronRight } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";
import formatCurrency from "@/app/helpers/format-currency";

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
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit px-2 py-0.5 bg-muted text-black rounded-full ${
            order.status !== "COMPLETED" && "bg-confirmed"
          }`}
        >
          <span className="blok text-sm font-semibold">
            {getOrderStatus(order.status)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={order.loja.imagemUrl} />
            </Avatar>
            <span>{order.loja.nome}</span>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <HiMiniChevronRight size={24} />
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-1.5">
          {order.products.map((product) => (
            <div key={product.id} className="flex space-x-2">
              <div className="flex flex-col items-center justify-center w-5 h-5 rounded-full bg-muted-foreground">
                <span className="block text-xs text-primary-foreground">
                  {product.quantity}
                </span>
              </div>
              <span className="text-muted-foreground text-sm">
                {product.product.nome}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-destructive text-sm hover:text-destructive"
            disabled={order.status !== "COMPLETED"}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
