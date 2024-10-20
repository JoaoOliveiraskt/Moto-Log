import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-products";
import Hero from "@/components/hero";
import RecentProducts from "@/components/recent-products";

export default function Home() {
  return (
    <main>
      <Hero />
      <Container className="space-y-8 2xl:px-4">
        <CategoryList />
        <DiscountProducts />
        <RecentProducts />
      </Container>
    </main>
  );
}
