"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import StoreBadge from "@/components/store-badge";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Loja } from "prisma/generated/client";

export function StoreCarouselContent({ stores }: { stores: Loja[] }) {
  return (
    <CarouselContent className="-ml-4 md:-ml-4">
      {stores.map((store) => (
        <CarouselItem key={store.id} className="sm:basis-1/2 lg:basis-1/3">
          <Link
            key={store.id}
            href={`/store/${store.id}`}
            className="group block h-[16rem] relative rounded-3xl"
          >
            <Card className="bg-accent h-full w-full rounded-3xl overflow-hidden p-2">
              <Image
                src={store.imagemUrl || ""}
                alt={store.nome}
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-[1.3rem] hover:brightness-75 transition-all"
              />
            </Card>
          </Link>
          <StoreBadge
            store={store}
            side="top"
            imageClassName="h-9 w-9"
            className="mt-3"
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
