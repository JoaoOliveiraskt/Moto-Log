'use client';

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession,  } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PiSignInBold } from "react-icons/pi";
import { PiSignOutBold } from "react-icons/pi";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

interface Props {
  className?: string;
}

const LoginButton = ({ className }: Props) => {
  const status = UserStatus();
  const handleSigInClick = () => signIn();
  const handleSigOutClick = () => signOut();
  return (
    <div>
      {status === "authenticated" ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSigOutClick();
          }}
          className={`flex items-center space-x-2 shadow-md ${className}`}
        >
          <span>Sair</span>
          <PiSignOutBold size={18} />
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSigInClick();
          }}
          className={`flex items-center space-x-2 shadow-md ${className}`}
        >
          <span>Entrar</span>
          <PiSignInBold size={18} />
        </Button>
      )}
    </div>
  );
};

export default LoginButton;

export const AvatarInfo = () => {
  const { data } = useSession();
  const status = UserStatus();
  return (
    <>
      {status === "authenticated" ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
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

          <LoginButton className="w-full" />
        </div>
      ) : (
        <div className="flex items-center justify-between mt-6">
          <h2 className="font-semibold tracking-tight">Faça seu login!</h2>
          <LoginButton />
        </div>
      )}
    </>
  );
};
