import { BannerSec } from "@/components/banner";
import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-products";
import Hero from "@/components/hero";
import RecomendedProducts from "@/components/recomended-products";


export default function Home() {
  return (
    <main>
      <Container className="grid gap-12">
        <Hero />
        <CategoryList />
        <DiscountProducts />
        <BannerSec />
        <RecomendedProducts />
      </Container>
    </main>
  );
}
