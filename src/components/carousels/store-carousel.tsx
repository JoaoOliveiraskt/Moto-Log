import TypographyH3 from "@/components/typography/typography-h3";
import TypographyP from "@/components/typography/typography-p";
import GetStores from "@/app/actions/store/get-stores";
import { StoreCarouselContent } from "./store-carousel-content";
import SeeAllButton from "../see-all-button";
import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

async function getStores() {
  try {
    console.log("Starting store search...");
    const stores = await GetStores({ limit: 6 });
    console.log("Stores found:", stores);

    if (!stores || stores.length === 0) {
      console.log("No stores found");
      return [];
    }

    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
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
        <div className="space-y-1">
          <TypographyH3>Lojas em Destaque</TypographyH3>
          <TypographyP className="text-muted-foreground">
            Explore{" "}
            <span className="text-primary font-semibold">
              lojas selecionadas
            </span>{" "}
            com os melhores produtos
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
        className="w-fit"
      >
        <StoreCarouselContent stores={stores} />
        <CarouselPrevious className="left-6" />
        <CarouselNext className="right-3" />
      </Carousel>
    </div>
  );
}
