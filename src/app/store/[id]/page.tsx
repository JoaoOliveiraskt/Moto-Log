import Container from "@/components/container";
import Icon from "@/components/icons/icon-component";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TypographyH3 from "@/components/typography/typography-h3";
import StoreInfo from "../components/store-info";

async function getData(id: string, bestSellers?: boolean) {
  const store = await db.loja.findUnique({
    where: { id },
    include: {
      _count: {
        select: { followers: true },
      },
      Produtos: {
        include: {
          loja: true,
          categoria: true,
        },
        where: {
          status: "ATIVO",
          estoque: { gt: 0 },
        },
        orderBy: { createdAt: "desc" },
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
  const storeImageUrl = store.profileImageUrl;
  const totalProducts = products.length;

  return (
    <>
      <Container className=" mt-12 lg:mt-14 lg:pt-2 min-h-screen">
        <StoreInfo
          name={store.nome}
          description={store.descricao}
          profileImageUrl={storeImageUrl}
          bannerImageUrl={store.bannerImageUrl}
          totalProducts={totalProducts}
          storeId={store.id}
          followers={store._count.followers}
          createdAt={store.createdAt}
        />

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
                <div className="grid gap-4 mt-8">
                  <TypographyH3>Todos os Produtos</TypographyH3>

                  <ProductList>
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        showStoreImage={false}
                      />
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
