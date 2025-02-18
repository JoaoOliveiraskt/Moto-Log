import Container from "@/components/container";
import SearchInput from "@/components/search-input";
import GetStores from "../actions/store/get-stores";
import StoreList from "./components/store-list";

const getStoreData = async () => {
  try {
    const stores = await GetStores({ limit: 30 });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }

    return stores;
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
