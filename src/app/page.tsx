import { MeteorBanner } from "@/components/banner";
import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-products";
import Hero from "@/components/hero";
import LoadingPage from "@/components/loading-page";
import RecommendedProducts from "@/components/recommended-products";
import { Suspense } from "react";

export default function Home() {
  return (
    
      <main>
        <Hero />
        <Container className="space-y-10">
          <CategoryList />
          <DiscountProducts />
          <MeteorBanner
            title="Confira nossas ofertas especiais"
            description="Aproveite nossas promoções e descontos exclusivos para você."
            href="discount"
            btnContent="Ver ofertas"
          />
          <RecommendedProducts />
        </Container>
      </main>
    
  );
}
