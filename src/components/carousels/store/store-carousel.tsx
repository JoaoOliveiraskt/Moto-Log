import TypographyH3 from "@/components/typography/typography-h3";
import TypographyP from "@/components/typography/typography-p";
import GetStores from "@/app/actions/store/get-stores";
import { StoreCarouselContent } from "./store-carousel-content";
import SeeAllButton from "../../see-all-button";
import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

async function getStores() {
  try {
    const stores = await GetStores({ limit: 6 });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }
    return stores;
  } catch (error) {
    return [];
  }
}

export default async function StoreCarousel() {
  const stores = await getStores();

  if (!stores || stores.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No stores found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TypographyH3>Lojas em Destaque</TypographyH3>
        <SeeAllButton href="/community" />
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 14,
        }}
        className="w-full h-full"
      >
        <StoreCarouselContent stores={stores} />
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
