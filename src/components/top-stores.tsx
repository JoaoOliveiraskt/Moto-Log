import Image from "next/image";
import { Link } from "next-view-transitions";
import TypographyP from "./typography/typography-p";
import GetStores from "@/app/actions/store/get-stores";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SeeAllButton from "./see-all-button";
import TypographyH4 from "./typography/typography-h4";

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
    <div className="space-y-8 pb-6">
      <div className="flex justify-between items-center">
        <TypographyH4>Lojas em destaque</TypographyH4>

        <SeeAllButton href={"/community"} />
      </div>
      <Carousel
        opts={{
          containScroll: "trimSnaps",
          slidesToScroll: "auto",
          duration: 20,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4 w-full">
          {stores &&
            stores.map((store: StoreProps) => (
              <CarouselItem className="basis-[124px] " key={store.id}>
                <Link
                  href={`/store/${store.id}`}
                  className="text-foreground font-medium hover:text-sky-600 hover:transition-colors flex flex-col gap-y-2"
                >
                  <div className="w-28 h-28 rounded-[1.5rem] overflow-hidden drop-shadow-lg">
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
        <CarouselNext className="hidden lg:-right-6  lg:inline-flex" />
        <CarouselPrevious className="hidden lg:-left-4  lg:inline-flex" />
      </Carousel>
    </div>
  );
}
