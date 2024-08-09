import React from "react";
import { db } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductBanner from "../components/product-banner";
import ProductInfo from "../components/product-info";
import GoBackButton from "@/components/go-back-button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";
import Container from "@/components/container";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import ProductCard from "@/components/product-card";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductDetail: React.FC<ProductPageProps> = async ({
  params: { id },
}) => {
  const produto = await db.produto.findUnique({
    where: {
      id,
    },
    include: {
      loja: true,
      categoria: true,
    },
  });

  if (!produto) {
    return notFound();
  }

  const images = Array.from({ length: 4 }, () => produto.imagemUrl);

  const relatedProducts = await db.produto.findMany({
    where: {
      categoriaId: produto.categoriaId,
      id: { not: produto.id }, // Exclui o produto atual dos relacionados
    },
    include: {
      loja: true,
    },

    take: 5, // Limita a 4 produtos
  });

  return (
    <>
      <Header />
      <BottomNav />
      <Container className="mt-8 lg:mt-20">
        <div className="w-full flex flex-col gap-8">
          <GoBackButton />
          <div className="flex flex-col w-full gap-8 lg:flex-row">
            <ProductBanner images={images} produto={produto} />

            <ProductInfo product={produto} quantity={0} />
          </div>

          <div className="">
            <div>
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="grid gap-6 mt-4">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      ve been using this backpack for a few weeks now and been a
                      great addition to my daily routine. The leather is
                      high-quality and the design is both stylish and practical.
                      Highly recommend!
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Alex Smith</h3>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        3 weeks ago
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      I recently purchased this backpack and s been a game-
                      changer for my daily commute. The laptop sleeve is
                      incredibly useful, and the overall quality is top-notch.
                      Definitely worth the investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-10 flex flex-col gap-4 w-full">
              <h2 className="text-2xl font-bold">Produtos Relacionados</h2>

              {/* Grid of related products */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
