"use client";

import Link from "next/link";

import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import TypographyP from "./typography/typography-p";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import LikeButton from "./like-button";
import { Prisma } from "../../prisma/generated/client";

interface StoreBadgeProps {
  store: Prisma.LojaGetPayload<{
    select: {
      id: true;
      nome: true;
      imagemUrl: true;
      descricao: true;
    };
  }>;
  showHoverCard?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export default function StoreBadge({
  store,
  showHoverCard = true,
  align = "start",
  side = "bottom",
}: StoreBadgeProps) {
  if (!store || !store.id) {
    console.error("Loja não está definida ou não possui um ID:", store);
    return null;
  }

  return (
    <HoverCard openDelay={20} closeDelay={20}>
      <HoverCardTrigger asChild className="cursor-pointer z-10 w-fit h-fit">
        <Link
          href={`/store/${store.id}`}
          className="text-foreground font-medium hover:text-cyan-600 flex items-center gap-2 w-fit h-fit"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
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

          <p className="text-sm">{store.nome}</p>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          `max-w-xs w-full z-50 cursor-default rounded-2xl dark:shadow-none p-4 ${
            showHoverCard === true ? "" : "hidden"
          } `
        )}
        align={align}
        side={side}
      >
        <div className="flex justify-between items-center">
          <Link
            href={`/store/${store.id}`}
            className="text-foreground font-medium w-fit h-fit hover:text-cyan-600 flex items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
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
            <div className="flex flex-col justify-center">
              <h5 className="text-xl ">{store.nome}</h5>
            </div>
          </Link>

          <LikeButton>Salvar Loja</LikeButton>
        </div>

        <div className="mt-4">
          <TypographyP className="line-clamp-3 text-sm">
            {store.descricao}
          </TypographyP>
        </div>
        <Button asChild className="mt-6 w-full rounded-lg">
          <Link href={`/store/${store.id}`}>Ver loja</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
