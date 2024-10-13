"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import icon from "@/components/icons/icon-component";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginDialog from "./login-dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
  onClick?: () => void;
  size?: "default" | "icon" | "sm" | "lg" | "xl" | "menu" | null;
}

const LoginButton = ({ className, size }: Props) => {
  const { isAuthenticated } = useAuth();

  const handleSigInClick = () => {
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
          <icon.signOut size={18} />
          <span>Sair</span>
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
          <Image src="/google.svg" width={16} height={16} alt="google icon" />
          <span>Entrar com o Google</span>
          <icon.signIn size={18} />
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
          <div className="flex items-center space-x-2 px-4">
            <Avatar>
              <AvatarImage
                src={data?.user?.image as string | undefined}
                alt={data?.user?.name as string | undefined}
              />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1]?.[0] || ""}{" "}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex space-x-1 text-foreground">
                <p className=" font-semibold tracking-tight">
                  {data?.user?.name?.split(" ")[0]}
                </p>
                <p className="line-clamp-1  font-semibold tracking-tight">
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
        <div className="flex items-center gap-4 px-4 mb-2">
          <h2 className="font-semibold tracking-tight">Faça seu login!</h2>

          <Button
            onClick={toggleOpen}
            variant={"ghost"}
            className={`flex items-center space-x-2`}
          >
            <span>Entrar</span>
            <icon.signIn size={18} />
          </Button>

          <LoginDialog open={open} onOpenChange={setOpen} />
        </div>
      )}
    </>
  );
};
