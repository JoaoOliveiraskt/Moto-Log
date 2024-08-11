"use client";

import { useContext, useState } from "react";
import Cart from "../cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";
import IconComponent from "../icons/icon-component";
import { CartContext } from "@/app/context/cart";

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
        className={`relative flex flex-col items-center gap-1 cursor-default text-muted-foreground hover:text-foreground ${className}`}
      >
        <IconComponent iconName="cart" size={iconSize} color="foreground" />
        {totalItems > 0 && (
          <span className="absolute flex items-center justify-center -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-destructive text-destructive-foreground text-xs">
            {totalItems}
          </span>
        )}
        <p className="text-muted-foreground hover:text-foreground">
          {children}
        </p>
      </Button>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="">Seu carrinho</SheetTitle>
        </SheetHeader>
        <Cart setIsOpen={setIsCartOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default CartSideBar;
