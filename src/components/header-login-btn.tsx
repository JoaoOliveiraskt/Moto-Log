"use client";

import { useState } from "react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/icons/icon-component";
import TypographySmall from "./typography/typography-small";

export default function HeaderLoginBtn() {
  const { isAuthenticated, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  if (loading) return null;

  return (
    <div className={`${isAuthenticated ? "hidden" : ""}`}>
      <Button
        onClick={toggle}
        className="h-8 gap-x-2  bg-[#0077ed] hover:bg-[#0077ed]/90 text-white"
      >
        <TypographySmall className="">Entrar</TypographySmall>
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
