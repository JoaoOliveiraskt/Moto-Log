import * as React from "react";
import FetchCategory from "../hooks/fetch-categories";
import CategoryItem from "./category-item";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default async function CategoryList() {
  const categories = await FetchCategory();

  return (
    <div id="category-list" className="mt-[80px] w-full">
      <h2 className="text-start text-4xl xl:text-[2.75rem] font-semibold text-primary mb-6">
        Categorias
      </h2>

      <Carousel className="">
        <CarouselContent className="flex gap-2 lg:px-10 ">
          {categories.map((category, index) => (
            <CategoryItem
              key={`${category.id}-${index}`}
              category={category}
              link={`/category/${category.id}`}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:block left-0" />
        <CarouselNext className="hidden lg:block right-0" />
      </Carousel>
    </div>
  );
}
