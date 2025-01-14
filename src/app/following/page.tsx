import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import TypographyH4 from "@/components/typography/typography-h4";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { GetUserFollows } from "../actions/user/following/get-user-follows";
import Image from "next/image";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import TypographyH1 from "@/components/typography/typography-h1";
import CustomCarousel from "@/components/carousels/custom-carousel";

export default async function FollowingPage() {
  try {
    const follows = await GetUserFollows();

    if (!follows?.length) {
      return (
        <Container className="min-h-[calc(100vh-3.5rem)] mt-12 lg:mt-14 lg:pt-2 space-y-6">
          <GoBackButton containerClassName="hidden lg:flex " />
          <div className="pt-6 lg:pt-0">
            <div>
              <TypographyH1 className="font-semibold ">
                Você ainda não segue nenhuma loja.
              </TypographyH1>

              <p className="text-muted-foreground mt-2">
                Siga lojas para receber atualizações de produtos e promoções.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <Button asChild className="w-fit">
                  <Link href="/community">Procure lojas para seguir</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      );
    }

    return (
      <Container className="mt-12 lg:mt-14 lg:pt-2 space-y-6">
        <GoBackButton containerClassName="hidden lg:flex " />

        <CustomCarousel>
          <CarouselContent className="-ml-3">
            {follows &&
              follows.map((follow) => (
                <CarouselItem className="basis-auto" key={follow.followId}>
                  <Link
                    href={`/store/${follow.store?.id}`}
                    className="text-foreground font-medium hover:text-sky-600 hover:transition-colors flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      {follow.store?.imagemUrl ? (
                        <Image
                          src={follow.store.imagemUrl}
                          width={500}
                          height={500}
                          alt="logo da loja"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                      )}
                    </div>

                    <p className="text-xs mt-2">
                      {follow.store?.nome.split(" ")[0]}
                    </p>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
        </CustomCarousel>

        <ProductList>
          {follows.map((follow) => (
            <Suspense key={follow.followId} fallback={<ProductCardSkeleton />}>
              {follow.produtos.map((produto) =>
                produto && produto.id ? (
                  // @ts-ignore
                  <ProductCard key={produto.id} product={produto} />
                ) : null
              )}
            </Suspense>
          ))}
        </ProductList>
      </Container>
    );
  } catch (error) {
    console.error("Erro ao buscar lojas seguidas do usuário:", error);
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <TypographyH4>Erro ao buscar lojas seguidas do usuário.</TypographyH4>
        </div>
      </Container>
    );
  }
}
