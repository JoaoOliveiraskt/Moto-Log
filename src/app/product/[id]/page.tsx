import React from "react";
import { db } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductBanner from "../components/product-banner";
import ProductInfo from "../components/product-info";
import GoBackButton from "../components/go-back-button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Cart from "@/components/cart";

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
      <div className="flex w-full overflow-hidden px-4">
        <div className="w-full lg:w-[78rem] mx-auto flex flex-col gap-6 rounded-md  mt-2 md:mt-8">
          <GoBackButton />
          <div className="flex flex-col w-full gap-6 lg:flex-row">
            <ProductBanner images={images} produto={produto} />

            <ProductInfo product={produto} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
