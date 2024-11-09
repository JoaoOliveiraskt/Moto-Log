import { Product } from "@/app/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRecentProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/product/all?limit=30&sort=recent`);

  if (!response.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  return response.json();
};

export const getBestSellers = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/product/all?bestSellers=true`);

  if (!response.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  return response.json();
};
