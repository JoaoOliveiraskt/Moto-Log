"use client";

import Link from "next/link";
import Icon from "../icons/icon-component";
import { Button } from "./button";
import LoginDialog from "../login-dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function OrderButton({
  children,
  className,
  size,
  onClick,
}: Props) {
  const { isAuthenticated } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => setOpenDialog(!openDialog);
  const handleClick = isAuthenticated ? onClick : toggleDialog;
  const pathName = usePathname();
  return (
    <>
      <Button
        asChild
        onClick={handleClick}
        variant="icon"
        size="icon"
        className={cn(
          "flex flex-col items-center gap-1 cursor-pointer outline-none border-none",
          pathName === "/my-orders"
            ? "text-foreground"
            : "text-muted-foreground",
          className
        )}
      >
        <Link
          href={isAuthenticated ? "/my-orders" : "#"}
          prefetch={false}
          className="flex flex-col items-center gap-1"
        >
          {pathName === "/my-orders" ? (
            <Icon.orderSolid size={size} className="text-foreground"/>
          ) : (
            <Icon.order size={size} />
          )}
          <p className="text-xs">{children}</p>
        </Link>
      </Button>

      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
}
