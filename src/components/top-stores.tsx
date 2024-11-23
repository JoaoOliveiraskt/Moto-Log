import TypographyH3 from "./typography/typography-h3";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Link } from "next-view-transitions";
import TypographyP from "./typography/typography-p";
import GetStores from "@/app/actions/store/get-stores";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface StoreProps {
  id: string;
  nome: string;
  imagemUrl: string;
}

async function getStores() {
  try {
    const stores = await GetStores({ limit: 20 });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }
    return stores;
  } catch (error) {
    return [];
  }
}

export default async function TopStores() {
  const stores = await getStores();

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <div className="sm:hidden space-y-4">
      <div>
        <TypographyH3>Lojas em Destaque</TypographyH3>
      </div>
      <Carousel
        opts={{
          containScroll: "trimSnaps",
          slidesToScroll: "auto",
          duration: 20,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-3">
          {stores &&
            stores.map((store: StoreProps) => (
              <CarouselItem className="basis-auto" key={store.id}>
                <Link
                  href={`/store/${store.id}`}
                  className="text-foreground font-medium hover:text-cyan-600 flex flex-col gap-y-2"
                >
                  <div className="w-28 h-28 rounded-[1.5rem] overflow-hidden ">
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
                  <div className="flex flex-col gap-y-1 justify-center ml-0.5 font-light">
                    <TypographyP className="text-xs ">{store.nome}</TypographyP>
                    <span className="text-xs">
                      4.8 <span>★</span>
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
