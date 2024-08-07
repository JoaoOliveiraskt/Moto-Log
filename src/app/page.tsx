import BottomNav from "@/components/bottom-nav";
import CategoryList from "@/components/category-list";
import DiscountProducts from "@/components/discount-produts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductSection from "@/components/product-section";

export default function Home() {
  return (
    <main className="bg-background">
      <Header/>
      <BottomNav />
      <Hero />
      <CategoryList/>
      <DiscountProducts />
      <ProductSection />
      <Footer />
    </main>
  );
}
