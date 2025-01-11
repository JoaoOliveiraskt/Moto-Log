"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import TypographyP from "./typography/typography-p";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface StoreBadgeProps {
  store: {
    id: string;
    nome: string;
    imagemUrl: string;
    descricao: string;
  };
  followers?: number;
  className?: string;
  imageClassName?: string;
  showImage?: boolean;
}

export default function StoreBadge({
  store,
  imageClassName,
  className,
  showImage = true,
}: StoreBadgeProps) {
  if (!store || !store.id) {
    console.error("Loja não está definida ou não possui um ID:", store);
    return null;
  }

  if (showImage === false) {
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
          <div
            className={cn(
              "w-6 h-6 rounded-full overflow-hidden flex-shrink-0",
              imageClassName
            )}
          >
            {store.imagemUrl ? (
              <Image
                src={store.imagemUrl}
                width={500}
                height={500}
                alt="logo da loja"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
            )}
          </div>

          <p className="text-sm whitespace-nowrap">{store.nome}</p>
        </Link>
      </HoverCardTrigger>

      <HoverCardContent
        align="start"
        side="top"
        className={cn(
          `max-w-xs lg:max-w-80 lg:min-w-80 w-full cursor-default rounded-xl dark:shadow-none p-4`
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
              {store.imagemUrl ? (
                <div>
                  <Image
                    src={store.imagemUrl}
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

        <Button asChild className="mt-6 w-full rounded-md">
          <Link href={`/store/${store.id}`}>Ver loja</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
