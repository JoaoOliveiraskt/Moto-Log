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
import Image from "next/image";

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
      loja: true,
    },
    take: 5,
  });

  const relatedProductsConvertidos = relatedProducts.map((prod) => ({
    ...prod,
    preco: prod.preco.toNumber(),
    porcentagemDesconto: prod.porcentagemDesconto
      ? prod.porcentagemDesconto.toNumber()
      : 0,
  }));

  return (
    <>
      <Container className="mt-5 lg:mt-20 space-y-4">
        <GoBackButton className="hidden lg:flex" />
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-fit h-fit border rounded-lg overflow-hidden">
              <Image
                src={produto.loja.imagemUrl as string}
                alt={produto.nome}
                width={500}
                height={500}
                className="w-8 h-8 object-cover"
              />
            </div>
            <p className="font-bold">{produto.loja.nome}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <ProductBanner
              images={images}
              produto={produto}
              className="rounded-xl"
            />
            {/* @ts-ignore */}
            <ProductInfo product={convertedProduct} quantity={0} />
          </div>

          <Comments />

          <div className="my-10 flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold">Produtos Relacionados</h2>

            <ProductList>
              {relatedProductsConvertidos.map((product) => (
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
