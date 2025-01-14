import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import TypographyH4 from "@/components/typography/typography-h4";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GetUserFavorites from "../actions/user/favorites/get-user-favorites";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import TypographyH1 from "@/components/typography/typography-h1";
import HeaderLoginBtn from "@/components/header-login-btn";

async function FavoritesContent() {
  try {
    const favorites = await GetUserFavorites();

    return favorites.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  } catch (error) {
    throw new Error("Erro ao buscar favoritos do usuário");
  }
}

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/");
  }

  try {
    const favorites = await GetUserFavorites();

    if (!favorites || !favorites.length) {
      return (
        <Container className="min-h-[calc(100vh-3.5rem)] mt-12 lg:mt-14 lg:pt-2 space-y-6">
          <GoBackButton containerClassName="hidden lg:flex" />
          <div className="pt-6 lg:pt-0">
            <div>
              <TypographyH1 className="font-semibold ">
                Você ainda não tem produtos favoritos.
              </TypographyH1>

              <p className="text-muted-foreground mt-2">
                Continue comprando e adicione produtos aos seus favoritos.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <Button asChild className="w-fit">
                  <Link href="/">Continuar comprando</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      );
    }

    return (
      <Container className="space-y-4 mt-12 lg:mt-14 lg:pt-2">
        <GoBackButton containerClassName="hidden lg:flex" />
        <Suspense
          fallback={
            <ProductList className="lg:gap-x-2">
              {Array.from({ length: 10 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </ProductList>
          }
        >
          <ProductList>
            <FavoritesContent />
          </ProductList>
        </Suspense>
      </Container>
    );
  } catch (error) {
    console.error("Erro ao buscar favoritos do usuário:", error);
    return (
      <Container className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <TypographyH4 className="text-center">
            Erro ao carregar os favoritos.
          </TypographyH4>
        </div>
      </Container>
    );
  }
}
