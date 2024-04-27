import Hero from "@/components/hero";
import ProductSection from "@/components/product-section";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <ProductSection/>
    </main>
  );
}
