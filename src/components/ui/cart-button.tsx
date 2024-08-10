"use client";

import { useContext } from "react";
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
}

const CartSideBar = ({ children, className }: Props) => {
  const { products } = useContext(CartContext);
  const totalItems = products.length;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground relative">
          <Button
            variant="icon"
            size="icon"
            className={`flex flex-col gap-1 cursor-pointer outline-none border-none ${className}`}
          >
            <IconComponent iconName="cart" size={26} color="foreground" />
            {totalItems > 0 && (
              <span className="absolute flex items-center justify-center top-1 -right-1 h-3.5 w-3.5 rounded-full bg-destructive text-destructive-foreground text-xs">
                {totalItems}
              </span>
            )}
            <p className="text-muted-foreground hover:text-foreground">
              {children}
            </p>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[75vw]">
        <SheetHeader>
          <SheetTitle className="">Seu carrinho</SheetTitle>
        </SheetHeader>
        <Cart />
      </SheetContent>
    </Sheet>
  );
};

export default CartSideBar;
