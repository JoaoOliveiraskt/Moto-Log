import { Product } from "@/app/types/product";
import { unstable_cache } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RECENT_CACHE_TIME = 300;
const BEST_SELLERS_CACHE_TIME = 900;

const fetchProducts = async (params: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/product/all${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Erro ao buscar produtos (${params}):`, error);
    return [];
  }
};

export const getRecentProducts = unstable_cache(
  async () => {
    return fetchProducts("?sortBy=recent");
  },
  ["recent-products"],
  { revalidate: RECENT_CACHE_TIME, tags: ["products"] }
);

export const getBestSellers = unstable_cache(
  async () => {
    return fetchProducts("?bestSellers=true");
  },
  ["best-sellers"],
  { revalidate: BEST_SELLERS_CACHE_TIME, tags: ["products"] }
);
