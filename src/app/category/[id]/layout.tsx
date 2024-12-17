import { Metadata } from "next";
import Container from "@/components/container";
import CategoryCarousel from "@/components/carousels/category/category-carousel";
import CategoryCarouselContent from "@/components/carousels/category/category-carousel-content";

export const metadata: Metadata = {
  title: "Categoria de produtos",
  description: "Encontre os melhores produtos da categoria",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CategoryCarousel>
        <CategoryCarouselContent />
      </CategoryCarousel>

      {children}
    </>
  );
}
