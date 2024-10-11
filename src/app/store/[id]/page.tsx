import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
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
        <GoBackButton className="hidden lg:flex"/>
      </Container>
      <div className="mt-2 mx-auto max-w-[1440px] relative h-[300px] overflow-hidden px-0 lg:px-4">
        {storeImageUrl ? (
          <Image
            src={storeImageUrl}
            alt="Store Banner"
            width={1920}
            height={1000}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-200 h-full flex items-center justify-center text-gray-700">
            <span>Loja sem imagem</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent " />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {store.nome}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground md:text-xl">
              Descubra as últimas tendências da moda em nossa loja.
            </p>
          </div>
        </div>
      </div>

      <Container className="!px-5">
        <div className="flex flex-col w-full">
          <div className="bg-background  lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <h2 className="text-2xl font-bold text-foreground">
                      Sobre nós
                    </h2>
                    <p className="text-muted-foreground">
                      A Store oferece moda de alta qualidade há mais de 20 anos.
                      Orgulhamo-nos de nossa ampla seleção das últimas
                      tendências e nosso excepcional atendimento ao cliente.
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h2 className="text-2xl font-bold text-foreground">
                      Informações da Loja
                    </h2>
                    <div className="grid gap-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon.location />
                        <span>Rua Principal 123, Cidade Exemplo, EUA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon.clock />
                        <span>Seg-Sáb: 10h - 20h, Dom: 12h - 18h</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  Contate-nos
                </Button>
              </div>
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Produtos Mais Vendidos
                </h2>
                {products.length > 0 ? (
                  <div className=" gap-2 ">
                    <ProductList className="!grid-cols-2 sm:!grid-cols-3">
                      {products.slice(0, 3).map((product) => (
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
        </div>
      </Container>
    </>
  );
}