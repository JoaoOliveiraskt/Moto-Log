"use client";

import { useState } from "react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import TypographySmall from "./typography/typography-small";

export default function HeaderLoginBtn() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <div className={`${isAuthenticated ? "hidden" : ""}`}>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={toggle}
        className="text-foreground h-9"
      >
        <TypographySmall>Entrar</TypographySmall>
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
