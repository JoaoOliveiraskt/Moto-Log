"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function UserInfo({ className }: { className?: string }) {
  const { data } = useSession();

  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <div
          className={cn(
            "flex gap-2 lg:gap-0 lg:flex-row items-center space-x-2",
            className
          )}
        >
          <Avatar className="w-12 h-12 lg:w-9 lg:h-9">
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
            <div className="flex space-x-1 text-foreground line-clamp-1">
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
      )}
    </>
  );
}
