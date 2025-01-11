import React from "react";
import { db } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductBanner from "../components/product-banner";
import AddToCartButton from "../components/add-to-cart-button";
import Container from "@/components/container";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import Comments from "@/app/product/components/comments";
import StoreBadge from "@/components/store-badge";
import TypographyH1 from "@/components/typography/typography-h1";
import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import DiscountBadge from "../components/discount-badge";
import ProductInfo from "../components/product-info";
import TypographyH4 from "@/components/typography/typography-h4";
import GoBackButton from "@/components/go-back-button";
import FavoriteProductButton from "@/components/favorite-product-button";
import FollowButton from "@/components/follow-button";

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
      loja: {
        select: { id: true, nome: true, imagemUrl: true, descricao: true },
      },
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

  const images = Array.from({ length: 6 }, () => produto.imagemUrl);

  const relatedProducts = await db.produto.findMany({
    where: {
      categoriaId: produto.categoriaId,
      id: { not: produto.id },
    },
    include: {
      loja: {
        select: { id: true, nome: true, imagemUrl: true, descricao: true },
      },
      categoria: true,
    },
    take: 10,
  });

  return (
    <>
      <Container className="mt-14 lg:mt-16 space-y-4">
        <GoBackButton containerClassName="hidden lg:flex" />
        <div className="grid lg:grid-cols-[3fr_1.5fr] lg:gap-x-6 w-full space-y-8 lg:space-y-0">
          <div>
            <div className="grid gap-y-6 max-w-4xl">
              <div>
                <ProductBanner images={images} produto={produto} />

                <TypographyH1 className="font-semibold text-xl lg:text-2xl line-clamp-2 mt-2">
                  {produto.nome}
                </TypographyH1>

                <div className="flex gap-x-4 mt-1">
                  <p className="font-semibold tracking-wide text-lg">
                    {formatCurrency(Number(calculateTotalPrice(produto)))}
                  </p>
                  <div className="flex items-center gap-x-4">
                    {Number(produto.porcentagemDesconto) > 0 && (
                      <p className="text-sm text-muted line-through">
                        {formatCurrency(Number(produto.preco))}
                      </p>
                    )}

                    {Number(produto.porcentagemDesconto) > 0 && (
                      <DiscountBadge product={produto} />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between mt-2">
                  <div className="inline-flex items-center justify-between sm:justify-normal">
                    {/* @ts-ignore */}
                    <StoreBadge
                      imageClassName="w-9 h-9"
                      store={produto.loja as any}
                    />
                    <FollowButton storeId={produto.loja.id} className="sm:ml-4"/>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* @ts-ignore */}
                    <AddToCartButton product={convertedProduct} quantity={0} />
                    <FavoriteProductButton
                      variant={"secondary"}
                      buttonSize={"rounded"}
                      className="w-9 h-9 lg:w-10 lg:h-10 p-1"
                      product={{ id: produto.id }}
                    />
                  </div>
                </div>

                <p className="text-muted-foreground line-clamp-4 !mt-4">
                  {produto.descricao}
                </p>
              </div>
              {/* @ts-ignore */}
              <ProductInfo product={convertedProduct} />
            </div>

            <Comments />
          </div>

          <div className="space-y-8 lg:space-y-0">
            <TypographyH4 className="lg:ml-2">Relacionados</TypographyH4>

            <ProductList className="lg:!grid-cols-1 xl:!grid-cols-1 lg:gap-y-0">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  {/* @ts-ignore */}
                  <ProductCard product={product}
                    className="lg:h-fit lg:flex lg:max-w-full lg:flex-1 lg:items-start lg:gap-x-2 lg:p-2"
                    imageClassName="lg:w-48 lg:h-36"
                    infoClassName="lg:py-0"
                    titleClassName="line-clamp-2"
                  />
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
