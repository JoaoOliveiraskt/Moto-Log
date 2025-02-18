"use client";

import { useContext } from "react";
import Icon from "./icons/icon-component";
import { CartContext } from "@/app/context/cart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
  model?: string;
  iconSize?: number;
}

const CartButton = ({ children, className, model, iconSize }: Props) => {
  const { products } = useContext(CartContext);
  const totalItems = products.length;
  const pathName = usePathname();

  return (
    <Link
      href="/cart"
      className={cn("flex items-center justify-center relative", className)}
    >
      <Icon.cart
        size={iconSize}
        className={cn(
          pathName === "/cart"
            ? "text-foreground"
            : "text-muted lg:text-foreground"
        )}
      />

      {totalItems > 0 && (
        <span className="absolute flex items-center justify-center -bottom-2 right-2 lg:right-1 lg:top-0 h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-destructive text-destructive-foreground text-xs"></span>
      )}
    </Link>
  );
};

export default CartButton;
