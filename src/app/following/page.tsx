import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import TypographyH4 from "@/components/typography/typography-h4";
import Link from "next/link";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { GetUserFollows } from "../actions/user/following/get-user-follows";
import Image from "next/image";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CustomCarousel from "@/components/carousels/custom-carousel";
import EmptyFollowing from "./components/empty-following";

export default async function FollowingPage() {
  try {
    const follows = await GetUserFollows();

    if (!follows || follows.length === 0) {
      return <EmptyFollowing />;
    }

    return (
      <Container className="pt-12 lg:pt-14 space-y-6">
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
                      {follow.store?.profileImageUrl ? (
                        <Image
                          src={follow.store.profileImageUrl}
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
