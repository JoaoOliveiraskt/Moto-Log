"use client";

import { useContext } from "react";
import Icon from "./icons/icon-component";
import { CartContext } from "@/app/context/cart";
import { Link } from "next-view-transitions";
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
    <div
      className={cn(
        "relative flex flex-col items-center justify-between text-foreground rounded-sm",
        className,
        pathName === "/cart" ? "text-foreground" : "text-muted-foreground"
      )}
    >
      <Link href="/cart" className={`relative`}>
        <Icon.cart
          size={iconSize}
          fill={`${pathName === "/cart" ? "currentColor" : "transparent"}`}
        />

        {totalItems > 0 && (
          <span className="absolute flex items-center justify-center top-0 -right-0.5 h-2 w-2 rounded-full bg-destructive text-destructive-foreground text-xs"></span>
        )}
      </Link>
      {children && <p className="text-xs">{children}</p>}
    </div>
  );
};

export default CartButton;
