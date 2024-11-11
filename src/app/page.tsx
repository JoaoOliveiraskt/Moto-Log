import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/carousels/discount-products";
import Hero from "@/components/hero";
import RecentProducts from "@/components/carousels/recent-products";
import BestSellers from "@/components/carousels/best-sellers";
import TopStores from "@/components/top-stores";
import DiscountCategoryCarousel from "@/components/carousels/discount-category";

export default function Home() {
  return (
    <main>
      <Container className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full z-20 bg-background pb-2.5 pt-4">
        <CategoryList />
      </Container>
      <Container className="space-y-10  mt-[9rem] ">
        <TopStores />
        <DiscountProducts />
        <DiscountCategoryCarousel />
        <BestSellers />
        <RecentProducts />
      </Container>
    </main>
  );
}
