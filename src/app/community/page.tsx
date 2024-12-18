import Container from "@/components/container";
import TypographyH1 from "@/components/typography/typography-h1";
import TypographyP from "@/components/typography/typography-p";
import { Card, CardContent } from "@/components/ui/card";
import Balancer from "react-wrap-balancer";
import { Loja } from "prisma/generated/client";
import StoreBadge from "@/components/store-badge";
import { db } from "@/lib/prisma";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { StoreCarouselSkeleton } from "@/components/skeletons/store-carousel-skeleton";

export default async function Community() {
  let stores: Loja[] = [];

  try {
    const response = await db.loja.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    stores = response;
  } catch (error) {
    throw new Error("Error fetching stores");
  }

  return (
    <Container className="min-h-screen mt-16">
      <div className="flex flex-col md:h-80 h-72 items-center mb-8 sm:mb-0">
        <TypographyH1
          className={cn(
            "text-center text-3xl lg:text-[2.7rem] mt-14 md:mt-24 font-semibold tracking-tighter max-w-[280px] md:max-w-xl"
          )}
        >
          Comunidade MotoLog
        </TypographyH1>
        <TypographyP className="text-center text-medium max-w-xs md:max-w-lg text-muted-foreground tracking-tight [&:not(:first-child)]:mt-2">
          <Balancer>
            Encontre vendedores em destaque no nosso marketplace. Faça parte
            dessa comunidade e comece a vender seus produtos hoje mesmo.
          </Balancer>
        </TypographyP>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8">
        {stores.map((store: Loja) => (
          <Link key={store.id} href={`/store/${store.id}`} className="">
            <Card className="bg-accent h-60 sm:h-72 w-full rounded-3xl overflow-hidden p-2">
              <Image
                src={store.imagemUrl || ""}
                alt={store.nome}
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-[1.3rem] hover:brightness-75 transition-all"
              />
            </Card>
            <StoreBadge
              store={store}
              side="top"
              imageClassName="h-9 w-9"
              className="mt-3"
            />
          </Link>
        ))}
      </div>
    </Container>
  );
}
