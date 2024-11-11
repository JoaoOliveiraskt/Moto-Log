import TypographyH3 from "@/components/typography/typography-h3";
import TypographyP from "@/components/typography/typography-p";
import GetStores from "@/app/actions/store/get-stores";
import { StoreCarouselContent } from "./store-carousel-content";

async function getStores() {
  try {
    console.log("Iniciando busca de lojas...");
    const stores = await GetStores({ limit: 6 });
    console.log("Lojas encontradas:", stores);

    if (!stores || stores.length === 0) {
      console.log("Nenhuma loja encontrada");
      return [];
    }

    return stores;
  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
    return [];
  }
}

export default async function StoreCarousel() {
  const stores = await getStores();

  if (!stores || stores.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Nenhuma loja encontrada
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <TypographyH3>Lojas em Destaque</TypographyH3>
        <TypographyP className="text-muted-foreground">
          Explore{" "}
          <span className="text-primary font-semibold">lojas selecionadas</span>{" "}
          com os melhores produtos
        </TypographyP>
      </div>

      <StoreCarouselContent stores={stores} />
    </div>
  );
}
