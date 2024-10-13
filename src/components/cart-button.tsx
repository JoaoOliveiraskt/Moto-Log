"use client";

import { useContext, useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import icon from "./icons/icon-component";
import { CartContext } from "@/app/context/cart";
import Cart from "./cart";
import { Separator } from "./ui/separator";

interface Props {
  children?: React.ReactNode;
  className?: string;
  model?: string;
  iconSize?: number;
}

const CartSideBar = ({ children, className, model, iconSize }: Props) => {
  const { products } = useContext(CartContext);
  const totalItems = products.length;

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <Button
        onClick={() => setIsCartOpen(true)}
        className={`relative flex flex-col items-center gap-1 text-muted-foreground ${className}`}
        variant={
          model as
            | "link"
            | "default"
            | "destructive"
            | "outline"
            | "secondary"
            | "ghost"
            | "icon"
            | null
            | undefined
        }
        size="icon"
      >
        <icon.cart size={iconSize} color="foreground" />
        {totalItems > 0 && (
          <span className="absolute flex items-center justify-center top-2 lg:-top-1 right-1 lg:-right-0 h-3.5 w-3.5 rounded-full bg-destructive text-destructive-foreground text-xs">
            {totalItems}
          </span>
        )}
        <p className="text-muted-foreground hover:text-foreground text-sm">
          {children}
        </p>
      </Button>

      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
          <Separator />
        </SheetHeader>
        <Cart setIsOpen={setIsCartOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default CartSideBar;
