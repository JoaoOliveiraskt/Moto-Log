"use client";

import { CartContext } from "@/app/context/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import formatCurrency from "@/app/helpers/format-currency";
import { Separator } from "./ui/separator";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount } = useContext(CartContext);

  return (
    <div className="py-5">
      <div className="flex w-full flex-col">
        <div className="space-y-4">
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>
      </div>

     <div className="mt-6">
     <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subTotalPrice)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Entrega</span>
            <span className="text-destructive uppercase">Grátis</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Descontos</span>
            <span>-{" "}{formatCurrency(totalDiscount)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="">Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
         
        </CardContent>
      </Card>
     </div>

      <Button className="w-full mt-6">Finalizar Compra</Button>
    </div>
  );
};

export default Cart;
