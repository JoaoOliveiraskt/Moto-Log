"use client";

import { useState } from "react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import TypographySmall from "./typography/typography-small";
import Icon from "./icons/icon-component";
import TypographyP from "./typography/typography-p";

export default function HeaderLoginBtn() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <div className={`${isAuthenticated ? "hidden" : ""}`}>
      <Button
        variant="icon"
        onClick={toggle}
        className="h-8 text-foreground px-2"
      >
        <p>Entrar</p>
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
