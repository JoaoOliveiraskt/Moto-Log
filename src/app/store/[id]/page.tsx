import Container from "@/components/container";
import Icon from "@/components/icons/icon-component";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const store = await db.loja.findUnique({
    where: { id },
    include: {
      Produtos: {
        include: {
          loja: true,
        },
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
  };
}

export default async function Store({ params }: Props) {
  const store = await getData(params.id);

  if (!store) {
    notFound();
  }

  const products = store?.Produtos || [];
  const storeImageUrl = store.imagemUrl;

  return (
    <>
      <Container className="lg:mt-20">
        <div className="w-full overflow-hidden">
          <div className="mt-20 lg:mt-4">
            {storeImageUrl ? (
              <Image
                src={storeImageUrl}
                alt="Store Banner"
                width={1000}
                height={1000}
                className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-2xl md:rounded-[28px] border"
              />
            ) : null}
          </div>

          <div className="w-full mt-4 md:mt-6 tracking-tighter">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-[44px]">
              {store.nome} -
            </h1>
            <p className="text-3xl font-bold text-foreground md:text-4xl lg:text-[44px] line-clamp-2 max-w-4xl lg:leading-[50px]">
              {store.descricao}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="gap-8">
            <div className="space-y-6">
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
              <Button
                size={"xl"}
                className="rounded-full md:text-[1.01rem] font-medium "
              >
                Contate-nos
              </Button>
            </div>
            <div className="grid gap-4 mt-8">
              <h2 className="text-2xl font-bold text-foreground">
                Produtos Mais Vendidos
              </h2>
              {products.length > 0 ? (
                <div className=" gap-2 ">
                  <ProductList className="!grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-4 ">
                    {products.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </ProductList>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Nenhum produto encontrado
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Todos os Produtos
            </h2>
            {products.length > 0 ? (
              <ProductList>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductList>
            ) : (
              <p className="text-muted-foreground ">
                Nenhum produto encontrado
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
