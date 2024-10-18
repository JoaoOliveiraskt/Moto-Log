import * as React from "react";
import FetchCategory from "../hooks/fetch-categories";
import CategoryItem from "./category-item";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";

export default async function CategoryList() {
  const categories = await FetchCategory();

  return (
    <div id="category-list" className="mt-[100px] w-full space-y-8">
      <h2 className="text-start text-4xl xl:text-[2.75rem] font-bold text-primary">
        Explorar
      </h2>

      <div className="flex items-center gap-8">
        <Link href="/recommended" className="text-muted-foreground hover:text-foreground font-bold transition-all">
          <span>Mais recentes</span>
        </Link>
        <Link href="/discount" className="text-muted-foreground hover:text-foreground font-bold transition-all">
          <span>Ofertas</span> 
        </Link>
      </div>

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
