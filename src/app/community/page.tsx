import Container from "@/components/container";
import TypographyH1 from "@/components/typography/typography-h1";
import TypographyP from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";
import { Loja } from "prisma/generated/client";
import StoreBadge from "@/components/store-badge";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import GoBackButton from "@/components/go-back-button";
import GetStores from "../actions/store/get-stores";

async function getStoresData() {
  try {
    const stores = await GetStores({ limit: 30 });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }
    return stores;
  } catch (error) {
    return [];
  }
}

export default async function Community() {
  const stores = await getStoresData();
  return (
    <Container className="min-h-screen pt-14 lg:pt-16 relative">
      <GoBackButton containerClassName="hidden lg:flex" />
      <div className="flex flex-col items-center mt-8">
        <TypographyH1 className={cn("text-center tracking-tight sm:max-w-2xl")}>
          Comunidade MotoLog
        </TypographyH1>
        <TypographyP className="text-center text-medium md:text-lg sm:max-w-xl text-muted-foreground tracking-tight [&:not(:first-child)]:mt-2">
          Encontre vendedores em destaque no nosso marketplace.
        </TypographyP>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 mt-8 lg:mt-20">
        {stores.map((store: Loja) => (
          <Link key={store.id} href={`/store/${store.id}`} className="">
            <Card className="bg-accent h-64 w-full rounded-3xl overflow-hidden p-2">
              <Image
                src={store.profileImageUrl || ""}
                alt={store.nome}
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-[1.3rem] hover:brightness-75 transition-all"
              />
            </Card>
            <StoreBadge
              // @ts-ignore
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
