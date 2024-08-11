import BottomNav from "@/components/bottom-nav";
import CategoryList from "@/components/category-list";
import Container from "@/components/container";
import DiscountProducts from "@/components/discount-produts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductSection from "@/components/product-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background">
      <Header/>
      <BottomNav />
      <Hero />
      <CategoryList/>
      <DiscountProducts />
      <Container className="py-5 xl:py-16">
      <div className="relative mx-auto sm:py-10 px-2 md:p-14 w-full h-40 sm:h-80 md:h-120  rounded-3xl overflow-hidden bg-gradient-to-tr from-zinc-200 via-zinc-100 dark:from-cyan-950/5 dark:via-transparent to-transparent">
            <Image
              src="https://images.unsplash.com/photo-1634885468882-b39d4e92d0a0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Tênis"
              className="absolute inset-0 w-full h-full object-cover"
              width={1000}
              height={1000}
            />
            <div className="relative flex items-end justify-between h-full pb-6 px-2">
              <strong className="max-w-44 sm:max-w-xl text-left text-xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                Descubra o seu próximo produto favorito.
              </strong>
              <Button className="">Comprar Agora</Button>
            </div>
          </div>
      </Container>
      <ProductSection />
      <Footer />
    </main>
  );
}
