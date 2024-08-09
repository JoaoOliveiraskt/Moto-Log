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
    },
  });

  if (!produto) {
    return notFound();
  }

  const images = Array.from({ length: 4 }, () => produto.imagemUrl);

  return (
    <>
      <Header />
      <BottomNav />
      <Container>
        <div className="flex w-full overflow-hidden pt-4 sm:mt-12">
          <div className="w-full lg:w-[78rem] mx-auto flex flex-col gap-6 rounded-md  mt-2 md:mt-8">
            <GoBackButton />
            <div className="flex flex-col w-full gap-6 lg:flex-row">
              <ProductBanner images={images} produto={produto} />

              <ProductInfo product={produto} quantity={0} />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
