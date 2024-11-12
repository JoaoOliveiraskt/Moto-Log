import { Metadata } from "next";
import CategoryList from "@/components/category-list";
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
      <Container className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full z-20 bg-background pb-2.5 pt-4">
        <CategoryCarousel>
          <CategoryCarouselContent />
        </CategoryCarousel>
      </Container>
      {children}
    </>
  );
}
