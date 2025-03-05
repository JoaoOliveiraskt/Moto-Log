import Container from "@/components/container";
import DiscountProducts from "@/components/carousels/product/discount-products";
import RecentProducts from "@/components/carousels/product/recent-products";
import BestSellers from "@/components/carousels/product/best-sellers";
import TopStores from "@/components/top-stores/index";
import DiscountCategoryCarousel from "@/components/carousels/category/discount-category-content";
import CategoryCarousel from "@/components/carousels/category/category-carousel";
import CategoryCarouselContent from "@/components/carousels/category/category-carousel-content";
import TopStoreSkeleton from "@/components/skeletons/top-store-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="">
      <CategoryCarousel>
        <CategoryCarouselContent />
      </CategoryCarousel>

      <Container className="space-y-10 mt-[5.7rem] lg:mt-[6.2rem] pb-20 pt-4 !px-0 xl:px-0">
        <DiscountProducts />
        <Suspense fallback={<TopStoreSkeleton />}>
          <TopStores />
        </Suspense>
        <BestSellers />
        <DiscountCategoryCarousel />
        <RecentProducts />
      </Container>
    </main>
  );
}
