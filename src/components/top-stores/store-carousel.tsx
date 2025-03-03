import { StoreProps } from "./types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import StoreCard from "./store-card";

interface StoreCarouselProps {
  stores: StoreProps[];
}

export default function StoreCarousel({ stores }: StoreCarouselProps) {
  return (
    <Carousel
      opts={{
        containScroll: "trimSnaps",
        slidesToScroll: "auto",
        duration: 20,
        align: "start",
      }}
    >
      <CarouselContent className="flex gap-x-3 mx-4 2xl:mx-0 h-full">
        {stores &&
          stores.map((store: StoreProps) => (
            <CarouselItem className="p-0 basis-auto w-[11.4rem]" key={store.id}>
              <StoreCard store={store} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselNext className="hidden right-0 2xl:-right-6 xl:inline-flex" />
      <CarouselPrevious className="hidden left-0 2xl:-left-4 xl:inline-flex" />
    </Carousel>
  );
}
