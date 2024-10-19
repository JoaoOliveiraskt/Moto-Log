"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import icon from "@/components/icons/icon-component";
import LoginDialog from "./login-dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/icons/icon-component";
import TypographyLarge from "./typography/typography-large";
import Loader from "./ui/loader";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
  onClick?: () => void;
  size?: "default" | "icon" | "sm" | "lg" | "xl" | "menu" | null;
  iconSize?: number;
  children?: React.ReactNode;
}

const LoginButton = ({ className, size, iconSize, children }: Props) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSigInClick = () => {
    setLoading(true);
    signIn("google");
  };
  const handleSigOutClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          variant={"ghost"}
          size={size}
          onClick={(e) => {
            e.preventDefault();
            handleSigOutClick();
          }}
          className={`flex items-center space-x-3 ${className}`}
        >
          <icon.signOut size={iconSize} />
          {children}
        </Button>
      ) : (
        <Button
          size={"rounded"}
          onClick={(e) => {
            e.preventDefault();
            handleSigInClick();
          }}
          className={`flex items-center space-x-2 ${className}`}
        >
          <Icon.google size={24} />
          <span>Entrar com o Google</span>
          {loading ? <Loader /> : <Icon.signIn size={18} />}
        </Button>
      )}
    </div>
  );
};

export default LoginButton;

export const AvatarInfo = ({ onClick, size }: Props) => {
  const { data } = useSession();
  const status = UserStatus();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      {status === "authenticated" ? (
        <div className="space-y-2 mb-4">
          <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row items-center space-x-2 px-4">
            <Avatar className="w-12 h-12 lg:w-8 lg:h-8">
              <AvatarImage
                src={data?.user?.image as string | undefined}
                alt={data?.user?.name as string | undefined}
              />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1]?.[0] || ""}{" "}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center lg:items-start gap-1">
              <div className="flex space-x-1 text-foreground">
                <p className=" font-semibold tracking-tight">
                  {data?.user?.name?.split(" ")[0]}
                </p>
                <p className="line-clamp-1 font-semibold tracking-tight">
                  {data?.user?.name?.split(" ")[1]}
                </p>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {data?.user?.email}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 px-4 mb-2">
          <p className="font-semibold tracking-tight">Faça seu login!</p>

          <Button
            onClick={toggleOpen}
            className={`flex items-center space-x-2 px-8 lg:px-4`}
          >
            <span className="text-sm font-semibold tracking-wider">Login</span>
            <icon.signIn size={18} />
          </Button>

          <LoginDialog open={open} onOpenChange={setOpen} />
        </div>
      )}
    </>
  );
};
