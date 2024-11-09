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
      <Button size={"rounded"} onClick={toggle} className="h-9">
        <TypographyP className="mr-2">Entrar</TypographyP>
        <Icon.signIn size={16} />
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
