import { Product } from "@/app/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchProducts = async (params: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/product/all${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["products"],
        revalidate: 300,
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

export const getDiscountProducts = async (limit?: number) => {
  return fetchProducts(`?withDiscount=true${limit ? `&limit=${limit}` : ''}`);
};

export const getRecentProducts = async (limit?: number) => {
  return fetchProducts(`?sortBy=recent${limit ? `&limit=${limit}` : ''}`);
};

export const getBestSellers = async (limit?: number) => {
  return fetchProducts(`?bestSellers=true${limit ? `&limit=${limit}` : ''}`);
};
