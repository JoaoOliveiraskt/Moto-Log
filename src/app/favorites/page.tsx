import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import TypographyH4 from "@/components/typography/typography-h4";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GetUserFavorites from "../actions/user/favorites/get-user-favorites";
import EmptyFavorites from "./components/empty-favorites";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/");
  }

  let favorites = [];
  try {
    favorites = await GetUserFavorites();
  } catch (error) {
    console.error("Erro ao buscar favoritos do usuário:", error);
    return (
      <Container>
        <GoBackButton />
        <TypographyH4>Erro ao carregar os favoritos.</TypographyH4>
      </Container>
    );
  }

  if (!favorites || favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <Container>
      <GoBackButton />
      <TypographyH4>Seus Favoritos</TypographyH4>
      <ProductList>
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductList>
    </Container>
  );
}
