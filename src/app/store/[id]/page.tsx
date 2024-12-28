import Container from "@/components/container";
import Icon from "@/components/icons/icon-component";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import TypographyH3 from "@/components/typography/typography-h3";
import TypographyP from "@/components/typography/typography-p";
import TypographyH2 from "@/components/typography/typography-h2";

async function getData(id: string, bestSellers?: boolean) {
  const store = await db.loja.findUnique({
    where: { id },
    include: {
      Produtos: {
        include: {
          loja: true,
          categoria: true,
        },
        where: {
          status: "ATIVO",
          estoque: { gt: 0 },
        },
        ...(bestSellers && { orderBy: { totalVendido: "desc" } }),
      },
    },
  });

  if (!store) {
    return null;
  }

  return store;
}

interface Props {
  params: {
    id: string;
    bestSellers?: boolean;
  };
}

export default async function Store({ params }: Props) {
  const store = await getData(params.id);
  const bestSellers = await getData(params.id, true);

  if (!store) {
    notFound();
  }

  const products = store?.Produtos || [];
  const bestSellersProducts = bestSellers?.Produtos || [];
  const storeImageUrl = store.imagemUrl;
  const totalProducts = products.length;

  return (
    <>
      <Container className="mt-14 lg:mt-20 min-h-[calc(100vh-5rem)]">
        <div className="w-full h-24 lg:h-52 relative">
          {storeImageUrl ? (
            <Image
              src={storeImageUrl}
              alt="Store Banner"
              width={600}
              height={600}
              className="w-full h-full object-cover rounded-lg lg:rounded-2xl flex-shrink-0"
            />
          ) : null}
        </div>
        <div className="w-full flex items-center gap-x-4 mt-4">
          <div className="">
            {storeImageUrl ? (
              <Image
                src={storeImageUrl}
                alt="Store Banner"
                width={600}
                height={600}
                className="w-20 h-20 sm:w-40 sm:h-40 object-cover rounded-full flex-shrink-0 drop-shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 sm:w-40 sm:h-40 bg-accent rounded-full flex-shrink-0 animate-pulse"></div>
            )}
          </div>

          <div className="flex-1 ">
            <TypographyH2 className="text-xl lg:text-4xl">
              {store.nome}
            </TypographyH2>

            <TypographyP className="text-xs sm:text-sm text-muted-foreground [&:not(:first-child)]:mt-1">
              1999 seguidores • <span>{totalProducts} produtos</span>
            </TypographyP>

            <TypographyP className="text-xs sm:text-sm text-muted-foreground max-w-md [&:not(:first-child)]:mt-2 line-clamp-1">
              {store.descricao}
            </TypographyP>

            <Button
              size={"rounded"}
              className="font-semibold px-8 mt-4 hidden sm:inline-flex"
            >
              Seguir
            </Button>
          </div>
        </div>
        <Button
          size={"rounded"}
          className="font-semibold px-6 mt-4 sm:hidden w-full "
        >
          Seguir
        </Button>

        <div className="flex flex-col w-full">
          <div className="gap-8">
            <div className="space-y-6 hidden">
              <div className="grid gap-3 text-muted-foreground mt-4">
                <div className=" ">
                  <span className="text-sm font-medium">Avaliações</span>
                  <div className="flex gap-0.5 w-full items-center">
                    <Icon.star className="w-3.5 h-3.5 text-foreground" />
                    <Icon.star className="w-3.5 h-3.5 text-foreground" />
                    <Icon.star className="w-3.5 h-3.5 text-foreground" />
                    <Icon.star className="w-3.5 h-3.5 text-foreground" />
                    <Icon.star className="w-3.5 h-3.5" />
                    <span className="ml-2 text-foreground">4.10 (11)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4"></div>
            </div>

            {store.Produtos.length === 0 ? (
              <div className="flex justify-center items-center h-72">
                <TypographyH3>
                  Não há produtos disponíveis no momento!
                </TypographyH3>
              </div>
            ) : (
              <>
                <div className="grid gap-4 mt-6">
                  <TypographyH3>Produtos Mais Vendidos</TypographyH3>

                  <div className=" gap-2 ">
                    <ProductList className="!grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-4 xl:!grid-cols-5">
                      {bestSellersProducts.slice(0, 5).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </ProductList>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <TypographyH3>Todos os Produtos</TypographyH3>

                  <ProductList>
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </ProductList>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
