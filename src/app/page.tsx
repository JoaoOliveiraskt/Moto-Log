import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-products";
import Hero from "@/components/hero";
import RecentProducts from "@/components/recent-products";
import TopStores from "@/components/top-stores";

export default function Home() {
  return (
    <main>
      <Hero />
      <Container className="space-y-8  mt-[6rem]">
        <CategoryList />
        <TopStores />
        <DiscountProducts />
        <RecentProducts />
      </Container>
    </main>
  );
}
