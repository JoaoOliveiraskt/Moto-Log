import TypographyH3 from "@/components/typography/typography-h3";
import TypographyP from "@/components/typography/typography-p";
import Link from "next/link";
import Image from "next/image";
import GetStores from "@/app/actions/store/get-stores";
import { Card } from "@/components/ui/card";
import StoreBadge from "@/components/store-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SeeAllButton from "../see-all-button";

export default async function StoreCarousel() {
  const stores = await GetStores({ limit: 6 });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <TypographyH3>Lojas em Destaque</TypographyH3>
          <TypographyP className="text-muted-foreground">
            Conheça as{" "}
            <span className="text-primary font-semibold">melhores lojas</span>{" "}
            do nosso marketplace
          </TypographyP>
        </div>
        <SeeAllButton href="/community" />
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 17,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {stores.map((store) => (
            <CarouselItem
              key={store.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/store/${store.id}`}>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2 " />
      </Carousel>
    </section>
  );
}
