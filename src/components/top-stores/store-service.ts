import GetStores from "@/app/actions/store/get-stores";
import { StoreProps } from "./types";

export async function getStoresData({
  limit = 30,
}: { limit?: number } = {}): Promise<StoreProps[]> {
  try {
    const stores = await GetStores({ limit });

    if (!stores || stores.length === 0) {
      throw new Error("No stores found");
    }
    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}
