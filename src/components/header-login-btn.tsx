"use client";

import React, { useState } from "react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import TypographySmall from "./typography/typography-small";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"button"> {
  className?: string;
}

export default function HeaderLoginBtn({ className, ...props }: Props) {
  const { isAuthenticated, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  if (loading) return null;

  return (
    <div className={`${isAuthenticated ? "hidden" : ""}`}>
      <Button
        onClick={toggle}
        {...props}
        className={cn(
          "bg-[#0077ed] hover:bg-[#0077ed]/90 text-white tracking-wide",
          className
        )}
      >
        Entrar
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
