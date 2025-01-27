import { useQuery, type UseQueryResult } from "@tanstack/react-query";

interface Store {
  id: string;
  nome: string;
  descricao: string;
  slug: string;
  imagemUrl: string;
}

const fetchStoreData = async (): Promise<Store | null> => {
  const response = await fetch(`/api/user/stores`);
  const data = await response.json();
  return data || null;
};

export const useStore = (): UseQueryResult<Store | null> => {
  return useQuery({
    queryKey: ["storeData"],
    queryFn: () => fetchStoreData(),
    enabled: true,
    placeholderData: null,
  });
};
