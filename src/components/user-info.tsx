"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export default function UserInfo() {
  const { data } = useSession();

  const { isAuthenticated, user } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <div className="space-y-2 mb-4">
          <div className="flex gap-2 lg:gap-0 lg:flex-row items-center space-x-2 px-4 pt-3">
            <Avatar className="w-12 h-12 lg:w-11 lg:h-11">
              <AvatarImage
                src={data?.user?.image as string | undefined}
                alt={data?.user?.name as string | undefined}
              />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1]?.[0] || ""}{" "}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start">
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
      )}
    </>
  );
}
