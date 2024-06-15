"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function MenuButton() {
  const { data, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
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
      ) : (
        <LoginButton />
      )}
    </>
  );
}

interface Props {
  className?: string;
}

const LoginButton = ({ className }: Props) => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className={`shadow-md ${className}`}
        >
          Logout
        </Button>
      ) : (
        <Button onClick={() => signIn()} className="shadow-md">
          Login
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
