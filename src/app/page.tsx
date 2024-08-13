import { Banner } from "@/components/banner";
import BottomNav from "@/components/bottom-nav";
import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-products";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import RecomendedProducts from "@/components/recomended-products";


export default function Home() {
  return (
    <main>
      <Header />
      <BottomNav />
      <Container>
        <Hero />
        <CategoryList />
        <DiscountProducts />
        <Banner />
        <RecomendedProducts />
      </Container>
      <Footer />
    </main>
  );
}
