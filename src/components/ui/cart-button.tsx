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

const CartButton = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
          <IoCartOutline size={24} />
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

export default CartButton;
