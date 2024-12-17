import React from "react";
import { db } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductBanner from "../components/product-banner";
import ProductInfo from "../components/product-info";
import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import Comments from "@/app/product/components/comments";
import Image from "next/image";
import TypographyH3 from "@/components/typography/typography-h3";
import StoreBadge from "@/components/store-badge";

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

  const convertedProduct = {
    ...produto,
    preco: produto.preco.toNumber(),
    porcentagemDesconto: produto.porcentagemDesconto
      ? produto.porcentagemDesconto.toNumber()
      : 0,
  };

  const images = Array.from({ length: 4 }, () => produto.imagemUrl);

  const relatedProducts = await db.produto.findMany({
    where: {
      categoriaId: produto.categoriaId,
      id: { not: produto.id },
    },
    include: {
      loja: { select: { id: true, nome: true, imagemUrl: true } },
      categoria: true,
    },
    take: 5,
  });

  return (
    <>
      <Container className="mt-16 space-y-4">
        <GoBackButton containerClassName="hidden lg:flex" name={produto.nome}/>
        <div className="w-full space-y-8">
          <div className="grid lg:grid-cols-[1fr,1fr] gap-x-12 space-y-8 lg:space-y-0">
            <div className="space-y-4 w-full">
              <ProductBanner images={images} produto={produto} />
              <div>
                {/* @ts-ignore */}
                <StoreBadge store={produto.loja} />
              </div>
            </div>
            {/* @ts-ignore */}
            <ProductInfo product={convertedProduct} quantity={0} />
          </div>

          <Comments />

          <div className="my-10 flex flex-col gap-4 w-full">
            <TypographyH3>Produtos Relacionados</TypographyH3>

            <ProductList>
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  {/* @ts-ignore */}
                  <ProductCard product={product} />
                </div>
              ))}
            </ProductList>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
