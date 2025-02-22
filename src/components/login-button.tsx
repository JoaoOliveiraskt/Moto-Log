"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Icon from "@/components/icons/icon-component";
import LoginDialog from "./login-dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import TypographyLarge from "./typography/typography-large";

interface Props {
  className?: string;
  variant?: "secondary" | "ghost";
  children?: React.ReactNode;
  iconSize?: number;
}

const handleSigOutClick = () => {
  signOut({ callbackUrl: "/" });
};

export default function LoginButton({
  variant = "ghost",
  iconSize = 16,
  className,
}: Props) {
  const { isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);
  return (
    <>
      {isAuthenticated ? (
        <Button
          size={"menu"}
          variant={variant}
          onClick={(e) => {
            e.preventDefault();
            handleSigOutClick();
          }}
          className={`text-destructive hover:text-destructive flex gap-x-4 items-center !px-3 lg:!px-4 w-full justify-start py-5 ${className}`}
        >
          <div className="lg:w-fit w-9 lg:h-fit h-9 flex items-center justify-center rounded-xl bg-accent lg:bg-transparent">
            <Icon.signOut size={iconSize} />
          </div>
          <TypographyLarge className="font-medium">Sair</TypographyLarge>
        </Button>
      ) : (
        <div className="w-full">
          <Button
            size={"menu"}
            variant={variant}
            onClick={toggleOpen}
            className={`flex !px-3 w-full items-center gap-4 justify-start py-5 text-sky-600 hover:text-sky-500 ${className}`}
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-accent">
              <Icon.signIn size={iconSize} />
            </div>
            <TypographyLarge className="font-medium">Entrar</TypographyLarge>
          </Button>

          <LoginDialog open={open} onOpenChange={setOpen} />
        </div>
      )}
    </>
  );
}
