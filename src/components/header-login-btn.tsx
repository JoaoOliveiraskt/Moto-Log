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
        variant={"outline"}
        size={"rounded"}
        onClick={toggle}
        className="h-9"
      >
        <TypographySmall className="font-normal tracking-wide">
          Entrar
        </TypographySmall>
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
