import { BannerSec } from "@/components/banner";
import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-products";
import RecommendedProducts from "@/components/recommended-products";

export default function Home() {
  return (
    <main>
      <Container className="space-y-10">
        <CategoryList />
        <DiscountProducts />
        <BannerSec />
        <RecommendedProducts />
      </Container>
    </main>
  );
}
