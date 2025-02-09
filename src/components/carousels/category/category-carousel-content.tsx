import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CategoryItem from "@/components/category-item";
import { Categoria } from "prisma/generated/client";
import fetchCategories from "@/app/actions/category/fetch-categories";

export default async function CategoryCarouselContent() {
  const categories = await fetchCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <CarouselContent className="gap-x-3 mx-4 lg::mx-0 lg:ml-2">
      {categories?.map((category: Categoria) => (
        <CarouselItem key={category.id} className="basis-auto p-0">
          <CategoryItem category={category} link={`/category/${category.id}`} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
