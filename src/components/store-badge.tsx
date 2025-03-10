"use client";

import Link from "next/link";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import TypographyP from "./typography/typography-p";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import FormatFollowers from "@/app/helpers/format-followers";

interface StoreBadgeProps {
  store: {
    id: string;
    nome: string;
    profileImageUrl: string;
    descricao: string;
  };
  className?: string;
  nameClassName?: string;
  imageClassName?: string;
  showImage?: boolean;
  totalFollowers?: number;
  showFollowers?: boolean;
}

function useGetStoreFollowers(storeId: string) {
  return useQuery({
    queryKey: ["storeFollowers", storeId],
    queryFn: async () => {
      const response = await fetch(`/api/store/${storeId}/followers`);
      const data = await response.json();
      return data.followers;
    },
    staleTime: 1000 * 60,
  });
}

export default function StoreBadge({
  store,
  nameClassName,
  imageClassName,
  className,
  showImage = true,
  showFollowers = false,
}: StoreBadgeProps) {
  const { data: followers } = useGetStoreFollowers(store.id);

  if (!store || !store.id) {
    console.error("Loja não está definida ou não possui um ID:", store);
    return null;
  }

  return (
    <HoverCard openDelay={300} closeDelay={20}>
      <HoverCardTrigger className="relative cursor-pointer z-10 inline-flex">
        <Link
          href={`/store/${store.id}`}
          className={cn(
            "text-foreground font-medium hover:text-sky-600 items-center gap-2 inline-flex max-h-fit",
            className
          )}
        >
          {showImage && (
            <div
              className={cn(
                "w-6 h-6 rounded-full overflow-hidden flex-shrink-0",
                imageClassName
              )}
            >
              {store.profileImageUrl ? (
                <Image
                  src={store.profileImageUrl}
                  width={500}
                  height={500}
                  alt="logo da loja"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
              )}
            </div>
          )}

          <div className="flex items-center gap-x-2 lg:flex-col lg:items-start">
            <p
              className={cn(
                "text-sm whitespace-nowrap line-clamp-1 max-w-44",
                nameClassName
              )}
            >
              {store.nome.split(" ").slice(0, 3).join(" ")}
            </p>
            {showFollowers && <FormatFollowers followers={followers} className="text-muted-foreground" />}
          </div>
        </Link>
      </HoverCardTrigger>

      <HoverCardContent
        align="start"
        side="top"
        className={cn(
          `max-w-xs lg:max-w-80 lg:min-w-80 w-full cursor-default rounded-xl dark:shadow-none p-4 border`
        )}
      >
        <div className="flex justify-between items-start">
          <Link
            href={`/store/${store.id}`}
            className="w-full text-foreground font-medium h-fit  flex items-center  justify-between gap-2 hover:transition-colors"
          >
            <div>
              <h5 className="text-xl uppercase font-bold hover:text-sky-600">
                {store.nome}
              </h5>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              {store.profileImageUrl ? (
                <div>
                  <Image
                    src={store.profileImageUrl}
                    width={500}
                    height={500}
                    alt="logo da loja"
                    className="object-cover w-16 h-16 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500"></div>
              )}
            </div>
          </Link>
        </div>

        <div className="mt-4">
          <TypographyP className="line-clamp-3 text-sm">
            {store.descricao}
          </TypographyP>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <p className="text-muted-foreground text-xs">
            {followers > 999
              ? `${(followers / 1000)
                  .toFixed(1)
                  .replace(".", ",")} mil seguidores`
              : `${followers} ${followers <= 1 ? "seguidor" : "seguidores"}`}
          </p>
        </div>

        <Button asChild className="mt-6 w-full rounded-md">
          <Link href={`/store/${store.id}`}>Ver loja</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
