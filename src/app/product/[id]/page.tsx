import React from "react";
import { db } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductBanner from "../components/product-banner";
import ProductInfo from "../components/product-info";
import GoBackButton from "@/components/go-back-button";
import Container from "@/components/container";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import Comments from "@/components/comments";

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
    porcentagemDesconto: produto.porcentagemDesconto.toNumber(),
  };

  const images = Array.from({ length: 4 }, () => produto.imagemUrl);

  const relatedProducts = await db.produto.findMany({
    where: {
      categoriaId: produto.categoriaId,
      id: { not: produto.id },
    },
    include: {
      loja: true,
    },

    take: 5,
  });

  const relatedProductsConvertidos = relatedProducts.map((prod) => ({
    ...prod,
    preco: prod.preco.toNumber(),
    porcentagemDesconto: prod.porcentagemDesconto.toNumber(),
  }));

  return (
    <>
      <Container className="mt-5 lg:mt-20 space-y-4">
        <GoBackButton className="hidden lg:flex"/>
        <div className="w-full ">
          <div className="grid md:grid-cols-2 gap-4">
            <ProductBanner
              images={images}
              produto={produto}
              className="rounded-xl"
            />

            <ProductInfo product={convertedProduct} quantity={0} />
          </div>

          <Comments />

          <div className="my-10 flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold">Produtos Relacionados</h2>

            {/* Grid of related products */}
            <ProductList>
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductList>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
