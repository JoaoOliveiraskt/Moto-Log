import Image from "next/image";
import Link from "next/link";
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
  profileImageUrl: string;
  productsCount: number;
}

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

export default async function TopStores() {
  const stores = await getStoresData();

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 pb-6">
      <div className="flex justify-between items-center px-4 lg:px-0 lg:pl-4">
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
        <CarouselContent className="flex gap-x-2.5 mx-4 2xl:mx-0">
          {stores &&
            stores.map((store: StoreProps) => (
              <CarouselItem className="basis-auto p-0" key={store.id}>
                <Link
                  href={`/store/${store.id}`}
                  className="text-foreground font-medium hover:text-sky-600 hover:transition-colors flex flex-col gap-y-2"
                >
                  <div className="w-[7.3rem] h-[7.3rem] rounded-[2rem] overflow-hidden drop-shadow-sm">
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
                  <div className="flex flex-col gap-y-1 justify-center ml-0.5">
                    <TypographyP className="text-xs ">{store.nome}</TypographyP>
                    <span className="text-xs">
                      4.8 <span>★</span>
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselNext className="hidden right-0 2xl:-right-6  xl:inline-flex" />
        <CarouselPrevious className="hidden left-0 2xl:-left-4  xl:inline-flex" />
      </Carousel>
    </div>
  );
}
