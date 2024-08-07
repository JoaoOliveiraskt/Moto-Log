"use client";

import { IoCartOutline } from "react-icons/io5";
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

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const CartSideBar = ({ children, className }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <Button
            variant="icon"
            size="icon"
            className={`flex flex-col gap-1 cursor-pointer outline-none border-none ${className}`}
          >
            <IconComponent iconName="cart" size={24} color="foreground" />
            <p className="text-muted-foreground hover:text-foreground">
              {children}
            </p>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[90vw]">
        <SheetHeader>
          <SheetTitle className="">Seu carrinho</SheetTitle>
        </SheetHeader>
        <Cart />
      </SheetContent>
    </Sheet>
  );
};

export default CartSideBar;
