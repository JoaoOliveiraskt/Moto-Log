"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Icon from "@/components/icons/icon-component";
import LoginDialog from "./login-dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

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
  iconSize = 18,
  className,
  children,
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
          className={`text-destructive hover:text-destructive flex gap-4 items-center px-7 w-full justify-start py-6 ${className}`}
        >
          <Icon.signOut size={iconSize} strokeWidth={1.25}/>
          {children}
        </Button>
      ) : (
        <div className="w-full">
          <Button
            size={"menu"}
            variant={variant}
            onClick={toggleOpen}
            className={`flex px-6 w-full items-center gap-4 justify-start py-6 text-sky-600 hover:text-sky-500 ${className}`}
          >
            <Icon.signIn size={iconSize} strokeWidth={1.25}/>
            {children}
          </Button>

          <LoginDialog open={open} onOpenChange={setOpen} />
        </div>
      )}
    </>
  );
}
