"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import icon from "@/components/icons/icon-component";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
  onClick?: () => void;
}

const LoginButton = ({ className }: Props) => {
  const status = UserStatus();
  const handleSigInClick = () => signIn("google", { callbackUrl: "/" });
  const handleSigOutClick = () => signOut();

  const router = useRouter();
  return (
    <div>
      {status === "authenticated" ? (
        <Button
          variant={"ghost"}
          onClick={(e) => {
            e.preventDefault();
            handleSigOutClick();
            router.push("/");
          }}
          className={`flex items-center space-x-3 ${className}`}
        >
          <icon.signOut size={18} />
          <span>Sair</span>
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSigInClick();
          }}
          className={`flex items-center space-x-2 ${className}`}
        >
          <icon.google size={18} />
          <span>Entrar com o Google</span>
          <icon.signIn size={18} />
        </Button>
      )}
    </div>
  );
};

export default LoginButton;

export const AvatarInfo = ({onClick}: Props) => {
  const { data } = useSession();
  const status = UserStatus();

  return (
    <>
      {status === "authenticated" ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 px-4">
            <Avatar>
              <AvatarImage
                src={data?.user?.image as string | undefined}
                alt={data?.user?.name as string | undefined}
              />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex space-x-1">
                <p className="text-lg font-semibold tracking-tight">
                  {data?.user?.name?.split(" ")[0]}
                </p>
                <p className="line-clamp-1 text-lg font-semibold tracking-tight">
                  {data?.user?.name?.split(" ")[1]}
                </p>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {data?.user?.email}
              </p>
            </div>
          </div>

          <LoginButton className="w-full bg-transparent justify-start border-none" />
        </div>
      ) : (
        <div className="flex items-center gap-4 px-4">
          <h2 className="font-semibold tracking-tight">Faça seu login!</h2>
          <Link href="/login">
            <Button onClick={onClick} variant={"ghost"} className={`flex items-center space-x-2`}>
              <span>Entrar</span>
              <icon.signIn size={18} />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
