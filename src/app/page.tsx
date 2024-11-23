import Container from "@/components/container";
import DiscountProducts from "@/components/carousels/product/discount-products";
import RecentProducts from "@/components/carousels/product/recent-products";
import BestSellers from "@/components/carousels/product/best-sellers";
import TopStores from "@/components/top-stores";
import DiscountCategoryCarousel from "@/components/carousels/category/discount-category";
import StoreCarousel from "@/components/carousels/store/store-carousel";
import CategoryCarousel from "@/components/carousels/category/category-carousel";
import CategoryCarouselContent from "@/components/carousels/category/category-carousel-content";
import TopStoreSkeleton from "@/components/skeletons/top-store-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Container className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full z-20 bg-background pb-2.5 pt-3">
        <CategoryCarousel>
          <CategoryCarouselContent />
        </CategoryCarousel>
      </Container>
      <Container className="space-y-10 mt-[8.5rem] sm:mt-[9rem]">
        <Suspense fallback={<TopStoreSkeleton />}>
          <TopStores />
        </Suspense>
        <DiscountProducts />
        <DiscountCategoryCarousel />
        <BestSellers />
        <StoreCarousel />
        <RecentProducts />
      </Container>
    </main>
  );
}
