"use client";

import { CartContext } from "@/app/context/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import {Button} from "@/components/ui/button";

const Cart = () => {
  const {products} = useContext(CartContext);

  return (
    <div className="space-y-4 py-5 flex flex-col items-center">
     <div className="space-y-4">
     {products.map((product) => (
         <CartItem key={product.id} cartProduct={product} />
      ))}
     </div>

    <Button className="absolute bottom-6 m-auto">
        Finalizar Compra
    </Button>

    </div>
  );
};

export default Cart;