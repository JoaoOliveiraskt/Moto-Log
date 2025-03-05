"use client";

import React, { useState } from "react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import TypographySmall from "./typography/typography-small";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"button"> {
  className?: string;
  size?: "menu" | "sm" | "lg" | "xl";
}

export default function HeaderLoginBtn({ className, ...props }: Props) {
  const { isAuthenticated, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  if (loading) return null;

  return (
    <>
      <Button
        size={props.size}
        onClick={toggle}
        {...props}
        className={cn(isAuthenticated ? "hidden" : "", className)}
      >
        Entrar
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
