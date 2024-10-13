"use client";

import Link from "next/link";
import icon from "../icons/icon-component";
import { Button } from "./button";
import { useSession } from "next-auth/react";
import LoginDialog from "../login-dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children?: React.ReactNode;
  className?: string;
  size?: number;
}

export default function OrderButton({ children, className, size }: Props) {
  const { isAuthenticated } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => setOpenDialog(!openDialog);

  return (
    <>
      <Link
        href={isAuthenticated ? "/my-orders" : ""}
        className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <Button
          onClick={isAuthenticated ? undefined : toggleDialog}
          variant="icon"
          size="icon"
          className={`flex flex-col items-center gap-1 cursor-pointer outline-none border-none ${className}`}
        >
          <icon.order color="foreground" size={size} />
          <p className="text-muted-foreground hover:text-foreground text-sm">
            {children}
          </p>
        </Button>
      </Link>
      <LoginDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
}
