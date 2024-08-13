import BottomNav from "@/components/bottom-nav";
import Container from "@/components/container";
import Footer from "@/components/footer";
import GoBackButton from "@/components/go-back-button";
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

  return (
    <>
      <Container className="xl:mt-16">
        <GoBackButton />
      </Container>
      <div className=" mx-auto max-w-screen-xl relative h-[300px] overflow-hidden ">
        <Image
          src={store.imagemUrl}
          alt="Store Banner"
          width={1920}
          height={1000}
          className="w-full h-full object-cover"
        />
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
                        <LocateIcon className="h-5 w-5" />
                        <span>Rua Principal 123, Cidade Exemplo, EUA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5" />
                        <span>Seg-Sáb: 10h - 20h, Dom: 12h - 18h</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant={"secondary"} className="w-full md:w-auto">
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

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function LocateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}
