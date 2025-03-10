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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TypographyP from "@/components/typography/typography-p";

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
        select: {
          id: true,
          nome: true,
          profileImageUrl: true,
          descricao: true,
        },
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
        select: {
          id: true,
          nome: true,
          profileImageUrl: true,
          descricao: true,
        },
      },
      categoria: true,
    },
    take: 10,
  });

  return (
    <>
      <Container className=" mt-12 lg:mt-14 space-y-4 lg:pt-2">
        <GoBackButton containerClassName="hidden lg:flex" />
        <div className="grid lg:grid-cols-[3fr_1.5fr] lg:gap-x-6 w-full space-y-8 lg:space-y-0">
          <div>
            <div>
              <ProductBanner images={images} produto={produto} />

              <TypographyH1 className="font-bold text-xl lg:text-2xl line-clamp-2 mt-2 p-0 tracking-tight">
                {produto.nome}
              </TypographyH1>

              <div className="flex items-center gap-x-4">
                <p className="tracking-wide text-sm font-bold">
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

              <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between mt-4">
                <div className="flex items-center justify-between sm:justify-normal sm:gap-x-4">
                  <StoreBadge
                    nameClassName="font-semibold text-base"
                    imageClassName="w-10 h-10"
                    store={produto.loja as any}
                    showFollowers={true}
                  />
                  <FollowButton
                    storeId={produto.loja.id}
                    storeName={produto.loja.nome}
                    className="w-28"
                    followingClassName="w-28"
                  />
                </div>

                <div className="flex items-center gap-x-2">
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
            </div>

            <div className="w-full mt-4">
              <Accordion
                type="single"
                collapsible
                className="w-full bg-accent rounded-xl"
              >
                <AccordionItem value="item-1" className="px-4">
                  <AccordionTrigger>
                    <div className="space-y-2">
                      <ProductInfo product={convertedProduct} />
                      <p>Descrição...</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <TypographyP className="text-sm">
                      {produto.descricao}
                    </TypographyP>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                    titleClassName="lg:line-clamp-2"
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
