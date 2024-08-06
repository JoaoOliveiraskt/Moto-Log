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

const CartButton = () => {
  return (
    <Sheet>
      <SheetTrigger>
      <Button
          variant="outline"
          size="icon"
          className="cursor-pointer outline-none h-8 w-8 border-none">
          <IoCartOutline size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw]">
        <SheetHeader>
          <SheetTitle className="">Seu carrinho</SheetTitle>
        </SheetHeader>
        <Cart/>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
