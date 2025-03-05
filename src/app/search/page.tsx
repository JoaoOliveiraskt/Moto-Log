import Container from "@/components/container";
import SearchInput from "@/components/search-input";
import GetStores from "../actions/store/get-stores";
import StoreList from "./components/store-list";

interface Store {
  id: string;
  nome: string;
  descricao?: string;
  profileImageUrl: string;
  _count?: {
    followers: number;
  };
}

const getStoreData = async () => {
  try {
    const stores = await GetStores({ limit: 30 });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }

    const validStores =
      stores?.map((store: Store) => ({
        id: store.id,
        nome: store.nome,
        descricao: store.descricao || "",
        profileImageUrl: store.profileImageUrl,
        _count: {
          followers: store._count?.followers || 0,
        },
      })) || [];

    return validStores;
  } catch (error) {
    return [];
  }
};

export default async function SearchPage() {
  const stores = await getStoreData();
  return (
    <Container className="pt-14">
      <SearchInput className="rounded-xl h-11" />

      <StoreList stores={stores} />
    </Container>
  );
}
